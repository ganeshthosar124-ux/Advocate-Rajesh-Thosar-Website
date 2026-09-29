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

test("disclaimer is shown on first visit and remembered after agreeing", async ({ page }) => {
  await page.goto("/");
  const dialog = page.getByRole("dialog", { name: "Disclaimer" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "I agree" }).click();
  await expect(dialog).toBeHidden();
  await page.goto("/about");
  await expect(page.getByRole("dialog", { name: "Disclaimer" })).toBeHidden();
});

test("contact form reports validation errors", async ({ page }) => {
  await acceptDisclaimer(page);
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.locator("form [role=alert]")).toContainText("Please correct the highlighted fields");
  await expect(page.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");
});

test("unknown pages return 404", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
});
