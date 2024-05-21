import fs from "fs";
import puppeteer from "puppeteer";

async function fetchHTML() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://website6167870.nicepage.io/Page-9.html", { timeout: 0, waitUntil: "networkidle2" });
  const content = await page.content();

  fs.writeFileSync("about.html", content, "utf-8");

  console.log("Content has been saved to about.html!");

  await browser.close();
}
fetchHTML();
