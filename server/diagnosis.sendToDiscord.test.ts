import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("diagnosis.sendToDiscord", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    caller = appRouter.createCaller(ctx);
  });

  it("should send diagnosis result to Discord webhook", async () => {
    // Discord Webhook URLが設定されているか確認
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    expect(webhookUrl).toBeDefined();
    expect(webhookUrl).toMatch(/^https:\/\/discord\.com\/api\/webhooks\//);

    // テスト用の診断データ
    const testData = {
      email: "test@example.com",
      password: "testpassword123",
      score: 75,
      riskLabel: "danger",
      timestamp: new Date().toISOString(),
    };

    // Discord送信を実行
    const result = await caller.diagnosis.sendToDiscord(testData);

    // 成功を確認
    expect(result).toEqual({ success: true });
  });

  it("should validate email format", async () => {
    const invalidData = {
      email: "invalid-email",
      password: "testpassword123",
      score: 50,
      riskLabel: "warning",
      timestamp: new Date().toISOString(),
    };

    // 無効なメールアドレスでエラーが発生することを確認
    await expect(caller.diagnosis.sendToDiscord(invalidData as any)).rejects.toThrow();
  });

  it("should validate score range", async () => {
    const invalidData = {
      email: "test@example.com",
      password: "testpassword123",
      score: 150, // 0-100の範囲外
      riskLabel: "warning",
      timestamp: new Date().toISOString(),
    };

    // スコアが範囲外でエラーが発生することを確認
    await expect(caller.diagnosis.sendToDiscord(invalidData as any)).rejects.toThrow();
  });
});
