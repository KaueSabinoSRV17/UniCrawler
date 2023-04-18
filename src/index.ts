import { openPage } from "./use_cases/open_page/open_page"
import { login } from "./use_cases/login/login"
import dotenv from 'dotenv'
dotenv.config()


async function main() {
    dotenv.config()
    const { CPF, PASSWORD  } = process.env
    const { page, browser } = await openPage()
    const loggedInPage = await login(page)(CPF || '', PASSWORD || '')
    await browser.close()
}



main()