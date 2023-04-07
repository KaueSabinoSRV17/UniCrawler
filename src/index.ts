import puppeteer, { Page } from "puppeteer"

async function login() {

    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('https://studeo.unicesumar.edu.br/#!/access/login')

    await page.waitForSelector('#username')
    await page.type('#username', '49758458817')

    await page.waitForSelector('#password')
    await page.type('#password', 'Kaue.Unicesumar.17')

    await page.click('#login-form-studeo > div:nth-child(3) > form > div.row > div > button')

    const LESSONS_BUTTON = 'body > div.full-height.ng-scope > div > div.ng-scope > div > div.container-fluid.relative > div.pull-left.full-height.visible-sm.visible-xs > div > ul > li:nth-child(4) > uni-acomp-atividades > a > spanbody > div.full-height.ng-scope > div > div.ng-scope > div > div.container-fluid.relative > div.pull-left.full-height.visible-sm.visible-xs > div > ul > li:nth-child(4) > uni-acomp-atividades > a > span'
    await page.waitForSelector('span.hidden-xs')
    const buttons = await page.$$eval('span.hidden-xs', buttons => {
        buttons[2].click()
        return buttons
    })
    console.log(buttons.length)

    return page

}

async function getOpenLessons(page: Page) {
    const LESSONS_BUTTON = 'body > div.full-height.ng-scope > div > div.ng-scope > div > div.container-fluid.relative > div.pull-left.full-height.visible-sm.visible-xs > div > ul > li:nth-child(4) > uni-acomp-atividades > a > spanbody > div.full-height.ng-scope > div > div.ng-scope > div > div.container-fluid.relative > div.pull-left.full-height.visible-sm.visible-xs > div > ul > li:nth-child(4) > uni-acomp-atividades > a > span'
    await page.waitForSelector(LESSONS_BUTTON)
    await page.click(LESSONS_BUTTON)
}

(async () => {
    const page = await login()
})()