import { Page } from "puppeteer"

type NavbarOption = 'mediator' | 'notifications' | 'activities'
const HEADER_NAV = '.header-inner'

export function clickOnNavbarButton(page: Page) {

  const options = ['mediator', 'notifications', 'activities']

  return async (option: NavbarOption) => {

    const index = options.findIndex(avaliableOption => avaliableOption === option)

    await page.waitForSelector(HEADER_NAV)
    const nav = await page.$(HEADER_NAV)

    await page.evaluate((navbar, index) => {
      const activitiesButton = navbar?.querySelectorAll('.hidden-xs')[index] as HTMLButtonElement
      activitiesButton.click()
    }, nav, index)

    return page

  }
}
