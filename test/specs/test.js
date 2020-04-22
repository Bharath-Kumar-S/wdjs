import assert from 'assert';

assert.equal(2, 2)
const sync = import("@wdio/sync");

test('synchronous WebdriverIO test', () => sync(() => {
    browser.url('https://webdriver.io')
    expect(browser.getTitle()).toContain('WebdriverIO')
  
    // @ts-ignore
    browser.$('#search_input_react').click()
    browser.keys('click{enter}{ctrl} test test')
    // @ts-ignore
    browser.$('.aa-suggestions').waitForExist()
  }))