import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    page = new AppPage();
    page.navigateTo();
    browser.driver.sleep(1000);
  });

  it('Should be able to switch lang', async () => {
    const defaultTitle = await page.getStepTitle();
    page.switchLang();
    const changedTitle = await page.getStepTitle();
    expect(defaultTitle).not.toBe(changedTitle);
  });

  it('Should be able to switch theme', async () => {
    const defaultTheme = await page.getWidgetThemeClass();
    page.switchTheme();
    const changedTheme = await page.getWidgetThemeClass();
    expect(defaultTheme).not.toBe(changedTheme);
  });

  it('Default scenario should run', async () => {
    page.clickNext('I Agree');
    page.clickNext('Take selfie picture');
    page.clickNext('Upload photo');
    page.clickNext('Take Id picture');
    page.clickNext('Upload photo');
    expect(await page.getSummaryStepCount()).toBe(2);
  });
});
