import { Page } from "puppeteer";

const DISCIPLINE_LINE_TABLE_CELL = '.uni-acomp-atividades'

type Button = {
  click(): void
}

interface Discipline {
  pendingLessons: number,
  name: string,
  remainingDays: number,
  button: HTMLButtonElement | Button
}

export async function getDisciplineData(page: Page): Promise<Discipline[]> {

  await page.waitForSelector(DISCIPLINE_LINE_TABLE_CELL)

  const formatedDisciplines = await page.$$eval('td', disciplines => {

    const onlyPendingDisciplines = disciplines.filter(element => element.querySelector('.text-danger'))
    const formatedDisciplines = onlyPendingDisciplines.reduce<Discipline[]>((disciplines, currentElement) => {

      const pendingLessons = Number(currentElement.querySelector('.badge')?.textContent)
      const name = currentElement.querySelector('.ng-binding')?.textContent as string
      const remainingDays = Number(currentElement.querySelector('.text-danger')?.textContent?.replace(/\D/g, ''))
      const button = currentElement.nextElementSibling?.querySelector('button') || {click: () => 'Not Encountered'}
      
      disciplines.push({pendingLessons, name, remainingDays, button})

      return disciplines

    }, [])

    return formatedDisciplines
    
  })

  return formatedDisciplines

}