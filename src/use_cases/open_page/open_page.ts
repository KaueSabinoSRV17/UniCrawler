import puppeteer from "puppeteer"

export async function openPage(url: string = 'https://studeo.unicesumar.edu.br/#!/access/login') {

    const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox']})
    const page = await browser.newPage()
    await page.goto(url)

    return {page, browser}

}