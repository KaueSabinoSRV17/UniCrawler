import { Page } from "puppeteer";

const ACITIVITIES_BUTTON_XPATH = '/html/body/div[2]/div/div[1]/div/div[2]/div/ul/li[3]/uni-acomp-atividades/a/span'
const ACITIVITIES_BUTTON = 'body > div.full-height.ng-scope > div > div.ng-scope > div > div.pull-left.sm-table.hidden-xs.hidden-sm.header-controls > div > ul > li:nth-child(3) > uni-acomp-atividades > a > span'
const DISCIPLINES_DIV = 'body > div.modal.stick-up.fade.ng-scope.ng-isolate-scope.in > div > div > div'

export async function openActivitiesWindow(page: Page) {

    await page.waitForXPath(ACITIVITIES_BUTTON_XPATH)
    await page.click(ACITIVITIES_BUTTON)

    const disciplines = await page.$eval(DISCIPLINES_DIV, element => element.innerHTML)

    return {openedActivitiesPage: page, disciplines}
}