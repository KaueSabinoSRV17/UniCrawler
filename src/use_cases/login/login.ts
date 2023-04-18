import { Page, TimeoutError } from "puppeteer"
import dotenv from 'dotenv'

dotenv.config()

const USERNAME_ELEMENT = '#username'
const PASSWORD_ELEMENT = '#password'
const LOGIN_BUTTON ='#login-form-studeo > div:nth-child(3) > form > div.row > div > button' 
const WARNING_BUTTON = 'body > div.full-height.ng-scope > ui-view > ui-view > div.lock-container.full-height.slider.ng-scope > div > div > div > div > div > div > div > div > div.panel-footer.bg-white.p-t-10.p-b-10 > div > div.col-sm-6.text-left.sm-text-center.pull-left.sm-pull-reset > button'

export function login(page: Page) {
    return async (cpf: string = '', password: string = '') => {
        await page.waitForSelector(USERNAME_ELEMENT)
        await page.type(USERNAME_ELEMENT, cpf)

        await page.waitForSelector(PASSWORD_ELEMENT)
        await page.type(PASSWORD_ELEMENT, password)

        await page.click(LOGIN_BUTTON)

        const pageAfterWarning = handleWarning(page)

        return pageAfterWarning
    }
}

async function handleWarning(page: Page) {
    const FIVE_SECONDS = 5000
    try {
        await page.waitForSelector(WARNING_BUTTON, {timeout: FIVE_SECONDS})
        await page.click(WARNING_BUTTON)
        return page
    } catch (error) {
        if (error instanceof TimeoutError) {
            return page
        }
        throw new Error('Something went wrong while handling the warning message')
    } finally {
        return page
    }
}