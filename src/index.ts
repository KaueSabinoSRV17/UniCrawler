import puppeteer, { Browser, Page } from "puppeteer"
import dotenv from 'dotenv'
dotenv.config()

const URL = 'https://studeo.unicesumar.edu.br/#!/access/login'
const USERNAME = '#username'
const PASSWORD = '#password'
const LOGIN_BUTTON ='#login-form-studeo > div:nth-child(3) > form > div.row > div > button' 
const WARNING_BUTTON = 'body > div.full-height.ng-scope > ui-view > ui-view > div.lock-container.full-height.slider.ng-scope > div > div > div > div > div > div > div > div > div.panel-footer.bg-white.p-t-10.p-b-10 > div > div.col-sm-6.text-left.sm-text-center.pull-left.sm-pull-reset > button'
const ACTIVIIES_BUTTON_XPATH = '/html/body/div[2]/div/div[1]/div/div[1]/div[1]/div/ul/li[4]/uni-acomp-atividades/a/span'
const ACTIVIIES_BUTTON = 'body > div.full-height.ng-scope > div > div.ng-scope > div > div.container-fluid.relative > div.pull-left.full-height.visible-sm.visible-xs > div > ul > li:nth-child(4) > uni-acomp-atividades > a > span'
const LIST_OF_LEARNING_UNITS = 'body > div.modal.stick-up.fade.ng-scope.ng-isolate-scope.in > div > div > div > div.table-responsive > table > tbody > tr > td.nowrap.p-b-10.p-t-10'

async function login(browser: Browser) {

    const { CPF, PASSWORD_VALUE } = process.env

    const page = await browser.newPage()
    await page.goto(URL)

    await page.waitForSelector(USERNAME)
    await page.type(USERNAME, CPF || '')

    await page.waitForSelector(PASSWORD)
    await page.type(PASSWORD, PASSWORD_VALUE || '')

    await page.click(LOGIN_BUTTON)

    await page.waitForSelector(WARNING_BUTTON)
    await page.click(WARNING_BUTTON)

    return page

}

async function getOpenLessons(page: Page) {

    await page.waitForNetworkIdle()
    await page.waitForXPath(ACTIVIIES_BUTTON_XPATH)
    await page.click(ACTIVIIES_BUTTON)
    await page.click(ACTIVIIES_BUTTON)

    await page.waitForSelector(LIST_OF_LEARNING_UNITS)
    const numberOfOpenLessons = await page.$$eval('[title="Atividades pendentes"]', materias => {
        const listOfNumbers = materias.map(materia => Number(materia.textContent))
        const uniqueValues = new Set(listOfNumbers)
        return [...uniqueValues]
            .reduce((count, currentNumber) => count + currentNumber, 0)
    })

    return numberOfOpenLessons

}

(async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await login(browser)
    console.log(await getOpenLessons(page))
    await browser.close()
})()