import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  "/",
  "/about",
  "/practice-areas",
  "/practice-areas/cheque-dishonour",
  "/courts",
  "/insights",
  "/contact",
  "/disclaimer",
  "/privacy-policy",
  "/terms-of-use",
];

async function acceptDisclaimer(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem("disclaimer-accepted", "yes"));
}

test.describe("every page", () => {
  for (const path of pages) {
    test(`${path} renders, has no horizontal scroll and no axe violations`, async ({ page }) => {
      await acceptDisclaimer(page);
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Rajesh A\. Thosar/);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);

      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
    });
  }
});

test("disclaimer is shown on first visit and remembered after agreeing, across tabs", async ({ page, context }) => {
  await page.goto("/");
  const dialog = page.getByRole("dialog", { name: "Disclaimer" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "I agree" }).click();
  await expect(dialog).toBeHidden();
  await page.goto("/about");
  await expect(page.getByRole("dialog", { name: "Disclaimer" })).toBeHidden();
  const tab = await context.newPage();
  await tab.goto("/courts");
  await tab.waitForTimeout(300);
  await expect(tab.getByRole("dialog", { name: "Disclaimer" })).toBeHidden();
});

test("contact form reports validation errors and keeps what was typed", async ({ page }) => {
  await acceptDisclaimer(page);
  await page.goto("/contact");
  await page.getByLabel("Subject").fill("Property query");
  await page.getByLabel("Message").fill("Details of the enquiry go here.");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.locator("form [role=alert]")).toContainText("Please correct the highlighted fields");
  await expect(page.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Subject")).toHaveValue("Property query");
  await expect(page.getByLabel("Message")).toHaveValue("Details of the enquiry go here.");
});

test("mobile menu opens over the page, traps the background and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "menu button is mobile-only");
  await acceptDisclaimer(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();
  expect((await menu.boundingBox())!.height).toBeGreaterThan(400);
  expect(await page.evaluate(() => (document.querySelector("main") as HTMLElement).inert)).toBe(true);
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await menu.getByRole("link", { name: /Courts/ }).click();
  await expect(page).toHaveURL(/\/courts$/);
  await expect(menu).toBeHidden();
});

test.describe("with animations enabled", () => {
  test.use({ contextOptions: { reducedMotion: "no-preference" } });

  test("content below the fold is revealed on scroll, including after Back", async ({ page }) => {
    await acceptDisclaimer(page);
    const scrollThrough = async () => {
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= h; y += 400) {
        await page.evaluate((y) => window.scrollTo(0, y), y);
        await page.waitForTimeout(60);
      }
      await page.waitForTimeout(600);
      return page.evaluate(() => document.querySelectorAll("[data-reveal].reveal-pending:not(.is-visible)").length);
    };
    await page.goto("/");
    expect(await scrollThrough()).toBe(0);
    await page.goto("/courts");
    expect(await scrollThrough()).toBe(0);
    await page.goBack();
    await page.waitForTimeout(500);
    expect(await scrollThrough()).toBe(0);
  });

  test("first-screen content is never hidden waiting for animation", async ({ page }) => {
    await acceptDisclaimer(page);
    await page.goto("/practice-areas/criminal-law");
    await page.waitForTimeout(200);
    const hiddenOnScreen = await page.evaluate(() =>
      [...document.querySelectorAll("[data-reveal].reveal-pending:not(.is-visible)")].filter(
        (el) => el.getBoundingClientRect().top < window.innerHeight,
      ).length,
    );
    expect(hiddenOnScreen).toBe(0);
  });
});

test("unknown pages return 404", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
});

test("every indexable page has complete social and canonical metadata", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    const meta = await page.evaluate(() => ({
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
      ogSite: document.querySelector('meta[property="og:site_name"]')?.getAttribute("content"),
      twImage: document.querySelector('meta[name="twitter:image"]')?.getAttribute("content"),
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
    }));
    expect(new URL(meta.canonical!).pathname, path).toBe(path);
    expect(meta.ogImage, path).toContain("/opengraph-image");
    expect(meta.twImage, path).toContain("/opengraph-image");
    expect(meta.ogUrl, path).toBeTruthy();
    expect(meta.ogSite, path).toBe("Advocate Rajesh A. Thosar");
    expect(meta.description.length, path).toBeGreaterThanOrEqual(70);
    expect(meta.description.length, path).toBeLessThanOrEqual(165);
  }
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/practice-areas/writ-petitions");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap:");
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
});
