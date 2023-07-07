let { By, driver, Builder } = require('selenium-webdriver')
const dotenv = require('dotenv')
const searchedProjects = require('./searchedProjects.json')

dotenv.config()

async function runSelenium() {
	while (true) {
		try {
			console.log('\u001b[1;32m Selenium Started!')
			driver = await new Builder().forBrowser('chrome').build()
			await driver.get('https://github.com/AliakseiHryhoryeu')
			await driver.manage().setTimeouts({ implicit: 3000 })
			console.log('\u001b[1;34mTry Sign in!')
			await signIn()
			console.log('\u001b[1;32mSign in succesfull')
			// search worked
			// await searchProjects('react')

			await clearStars()
		} catch (error) {
			driver.quit()
		}
	}
}
runSelenium()

const clearStars = async (inputValue) => {
	for (let currentPage = 1; currentPage <= 100; currentPage++) {
		await driver.get(`https://github.com/AliakseiHryhoryeu?tab=stars`)

		await driver.manage().setTimeouts({ implicit: 3000 })
		for (let currentStar = 4; currentStar < 44; currentStar++) {
			let starsBtns = await driver.findElements(
				By.className('rounded-left-2 btn-sm btn BtnGroup-item')
			)
			await driver.manage().setTimeouts({ implicit: 44000 })
			await starsBtns[currentStar].submit()
		}
	}
}

// search projects
const searchProjects = async (inputValue) => {
	for (let currentPage = 1; currentPage <= 100; currentPage++) {
		await driver.get(
			`https://github.com/search?q=${inputValue}&type=repositories&s=updated&o=desc&p=${currentPage}`
		)
		await driver.manage().setTimeouts({ implicit: 3000 })
		for (let currentStar = 4; currentStar < 14; currentStar++) {
			let starsBtns = await driver.findElements(
				By.className('types__StyledButton-sc-ws60qy-0 kbjJSF')
			)
			await driver.manage().setTimeouts({ implicit: 3000 })
			await starsBtns[currentStar].click()
		}
	}
}

const signIn = async () => {
	// Sign in
	let menuBtn = await driver
		.findElement(
			By.className(
				'js-details-target Button--link Button--medium Button d-lg-none color-fg-inherit p-1'
			)
		)
		.click()
	let signInBtn = await driver
		.findElement(
			By.className(
				'HeaderMenu-link HeaderMenu-link--sign-in flex-shrink-0 no-underline d-block d-lg-inline-block border border-lg-0 rounded rounded-lg-0 p-2 p-lg-0'
			)
		)
		.click()

	// SignIn form
	await driver.manage().setTimeouts({ implicit: 3000 })
	let loginField = await driver.findElement(By.id('login_field'))
	let passwordField = await driver.findElement(By.id('password'))
	loginField.sendKeys(`${process.env.githubLogin}`)
	passwordField.sendKeys(`${process.env.githubPassword}`)
	let loginSubmitBtn = await driver
		.findElement(By.className('btn btn-primary btn-block js-sign-in-button'))
		.click()
}
