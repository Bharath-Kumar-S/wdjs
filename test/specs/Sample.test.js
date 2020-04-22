import assert from 'assert';
import { env } from '../test-data/test-env';
import { check } from '../utils/check';
import { useraction } from '../utils/action';
import { config } from '../config/suite.mocha.conf'
import { page } from '../pageobjects/help'
const timeout = config.waitforTimeout;
const { locators, libs } = page;
const utl = require('../../utilities/common-utilities');
import leche from 'leche'
const withData = leche.withData;
let data;
utl.excel_getTableRows(__dirname + '/../test-data/sample.xlsx', 'info', function (results) {
  console.log(results);
  data = results;
});


describe('Basic checks for internet app', () => {

  let resolved

  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    const title = await browser.getTitle();
     assert.strictEqual(title, 'WebdriverIO · Next-gen browser automation test framework for Node.js');
  //   require('./test');
  // resolved = require.resolve('./test');
  // delete require.cache[resolved];
  })

  

  it('should assert the wrong right title', async () => {
    await browser.url('https://webdriver.io');
    const title = await browser.getTitle();
     assert.strictEqual(title, 'Next-gen WebDriver test framework for Node.js');
  //    require('./test');
  // resolved = require.resolve('./test');
  // delete require.cache[resolved];

  })

  

})








//   it('The internet app - checkboxes check', async () => {

//     let { chexkboxlink, firstcheckbox, secondcheckbox, url } = locators.Internetcheckbox;
//     await browser.url(url);
//     await browser.setWindowSize(1920, 1080);
//     await useraction.waitFor('=Checkboxes', timeout, 'exist')
//     await useraction.clickElement("click", chexkboxlink);
//     await useraction.waitFor(firstcheckbox[0], timeout, 'exist')
//     await check.checkSelected(firstcheckbox[0], true);
//     await check.checkSelected(secondcheckbox[0]);
//     await useraction.clickElement("click", firstcheckbox);
//     await useraction.clickElement("click", secondcheckbox);
//     await check.checkSelected(firstcheckbox[0]);
//     await check.checkSelected(secondcheckbox[0], true);
//   })

//   it('The internet app - dynamic controls', async () => {
//     let { url, link, checkbox, checkboxbtn, alterbutton, avbutton } = locators.Internetdynamicontrols;
//     await browser.url(url);
//     await useraction.clickElement("click", link);
//     await check.checkSelected('#checkbox > input', true);
//     await useraction.clickElement("click", checkbox);
//     await useraction.waitFor(checkboxbtn[0], timeout, 'enabled');
//     await useraction.clickElement("click", checkboxbtn);
//     await useraction.waitFor(alterbutton[0], timeout, 'enabled');
//     await useraction.clickElement("click", alterbutton);
//     await useraction.waitFor(avbutton[0], timeout, 'enabled');
//     await useraction.clickElement("click", avbutton);
//   })


// withData(data,(d)=>{
//   it('Sample google search', async () => {
//     let { url, search, searchinput, resultslink } = locators.google;
//     await browser.url(url);
//     await useraction.setInputField('set', d.emp_name, search)
//     await useraction.pressButton('Enter');
//     await useraction.waitFor(`//h3[contains(text(),"${d.emp_name}")]`, timeout, 'exist')
//     // await useraction.clickElement('click', `//h3[contains(text(),"${d.emp_name}")]`)
//   })
// })

//   it('The internet app - slide controls', async () => {
//     let { url, sliderlink, slider } = locators.slider;
//     await browser.url(url);
//     await useraction.clickElement('click', sliderlink);
//     await useraction.setInputField('set', '4', slider);
//     await useraction.clickElement('click', slider);
//   })

// })