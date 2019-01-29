import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getStepTitle() {
    return element(by.css('iv-widget h1')).getText();
  }

  getWidgetThemeClass() {
    return element(by.css('iv-widget div')).getAttribute('class');
  }

  getSummaryStepCount() {
    return element.all(by.css('ivw-summary-step')).count();
  }

  clickNext(text) {
    const returnedValue = element(by.buttonText(text)).click();
    browser.driver.sleep(1000);
    return returnedValue;
  }

  async switchLang() {
    const selectDropdownbyNum = function(select, optionNum) {
      if (optionNum) {
        select.all(by.tagName('option')).then(function(options) {
          options[optionNum].click();
        });
      }
    };
    const el = element(by.id('lang'));
    selectDropdownbyNum(el, 1);
  }

  async switchTheme() {
    const selectDropdownbyNum = function(select, optionNum) {
      if (optionNum) {
        select.all(by.tagName('option')).then(function(options) {
          options[optionNum].click();
        });
      }
    };
    const el = element(by.id('theme'));
    selectDropdownbyNum(el, 1);
  }
}
