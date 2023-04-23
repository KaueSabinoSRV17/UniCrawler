import { openPage } from "./use_cases/open_page/open_page"
import { login } from "./use_cases/login/login"
import dotenv from 'dotenv'
import { clickOnNavbarButton } from "./use_cases/nav_bar/click_on_navbar_button"
import { getDisciplineData } from "./use_cases/disciplines/get_disciplines_data"
dotenv.config()

async function main() {
  dotenv.config()
  const { CPF, PASSWORD } = process.env
  const { page, browser } = await openPage()

  const loggedInPage = await login(page)(CPF || '', PASSWORD || '')
  const openedActivitiesPage = await clickOnNavbarButton(loggedInPage)('activities')
  const formatedDisciplines = await getDisciplineData(openedActivitiesPage)

  console.log(formatedDisciplines)
  console.log('Everything fine')

  //await browser.close()
}

main()
