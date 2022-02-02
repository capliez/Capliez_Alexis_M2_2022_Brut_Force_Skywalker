const generatePassword = require('./generatePassword');
const UTILS = require('./utils');

const scraperObject = {
	url: UTILS.URL,
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
		await generatePassword.brute(page, UTILS.MIN, UTILS.MAX)
		await browser.close()
	}
}

module.exports = scraperObject;
