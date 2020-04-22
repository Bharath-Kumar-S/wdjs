import { expect } from 'chai';
import { check } from './check';
import AllureReporter from '@wdio/allure-reporter';
import {config} from '../config/suite.mocha.conf'
const timeout = config.waitforTimeout;


/**
 * Clear a given input field (placeholder for WDIO's clearValue)
 * @param  {String[]}   selector Element selector array
 */
const clearInputField = async (selector) => {
  let elem;
  if (Array.isArray(selector)) {
    elem = await multiselector(selector);
  }
  else {
    elem = await browser.$(selector);
  }
  // let elem = await browser.$(selector);
  await elem.clearValue();
  let text = await elem.getText();
  expect(text).to.equal('', `Error in clearing value for "${selector}"`)
}

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String[]}   selector Element selector array 
 */
const clickElement = async (action, selector) => {
  let elem;
  if (Array.isArray(selector)) {
    elem = await multiselector(selector);
  }
  else {
    console.log('else')
    await check.checkIfElementExists(selector);
    elem = await browser.$(selector);
  }
  const method = (action === 'click') ? 'click' : 'doubleClick';
  await check.isDisplayed(elem.selector)
  // await check.isEnabled(elem.selector)
  await elem[method]();
}



/**
 * Set the value of the given input field to a new value or add a value to the
 * current selector value
 * @param  {String}   method  The method to use (add or set)
 * @param  {String}   value   The value to set the selector to
 * @param  {String}   selector Element selector
 */
const setInputField = async (method, value, selector) => {
  const command = (method === 'add') ? 'addValue' : 'setValue';
  let elem;
  if (Array.isArray(selector)) {
    elem = await multiselector(selector);
  }
  else {
    console.log('else')
    await check.checkIfElementExists(selector);
    elem = await browser.$(selector);
  }
  await elem[command](value || '');
}



/**
 * Check if any given element in array is available
 * @param  {String[]}   selector   Element selector array
 */
const multiselector = (selectorList) => {
  return new Promise((resolve, reject) => {
    return selectorList.forEach(async (v) => {
      let elem = await browser.$(v);
      console.log(elem.selector)
      if (elem.hasOwnProperty("error") === false) {
        return resolve(elem);
      } else {
        AllureReporter.addFeature("Locator fallback active");
        AllureReporter.addStep(`The ${v} does not exist looking for fallback locators`, {}, "failed");
        console.log("this selector does not exists: " + elem.selector);
        if (selectorList[selectorList.length - 1] === v) {
          return reject();
        }
      }
    })
  })
}


/**
 * Close all but the first tab
/* eslint @typescript-eslint/no-unused-vars: "off" */
const closeAllButFirstTab = async () => {
  const windowHandles = await browser.getWindowHandles();

  // Close all tabs but the first one
  windowHandles.reverse();
  windowHandles.forEach(async (handle, index) => {
    await browser.switchToWindow(handle);
    if (index < windowHandles.length - 1) {
      await browser.closeWindow();
    }
  });
}


/**
* Close the last opened window
*/
/* eslint @typescript-eslint/no-unused-vars: "off" */
const closeLastOpenedWindow = async () => {
  const lastWindowHandle = await browser.getWindowHandles().slice(-1)[0];

  await browser.closeWindow();
  await browser.switchToWindow(lastWindowHandle);
}


/**
* Delete a cookie
* @param  {String}   name The name of the cookie to delete
*/
const deleteCookies = async (name) => {
  await browser.deleteCookies([name]);
}


/**
 * Drag a element to a given destination
 * @param  {String}   selector      The selector for the source element
 * @param  {String}   destination The selector for the destination element
 */
const dragElement = async (selectorconst, destinationconst) => {
  const srcelem = await browser.$(selectorconst);
  const dstelem = await browser.$(destinationconst);

  await srcelem.dragAndDrop(dstelem);
}


/**
 * Focus the last opened window
/* eslint @typescript-eslint/no-unused-vars: "off" */
const focusLastOpenedWindow = async () => {
  const lastWindowHandle = await browser.getWindowHandles().slice(-1)[0];

  await browser.switchToWindow(lastWindowHandle);
}


/**
* Handle a modal
* @param  {String}   action    Action to perform on the modal (accept, dismiss)
* @param  {String}   modalType Type of modal (alertbox, confirmbox, prompt)
*/
const handleModal = async (action, modalType) => {
  let command = `${action.slice(0, 1).toLowerCase()}${action.slice(1)}Alert`;

  // Alert boxes can't be dismissed, this causes Chrome to crash during tests
  if (modalType === 'alertbox') {
    command = 'acceptAlert';
  }

  await browser[command]();
}


/**
* Move to the given selector with an optional offset on a X and Y position
* @param  {String}   selector  Element selector
* @param  {String}   x        X coordinate to move to
* @param  {String}   y        Y coordinate to move to
*/
const moveTo = async (selector, x, y) => {
  const intX = parseInt(x, 10) || undefined;
  const intY = parseInt(y, 10) || undefined;
  const elem = await browser.$(selector);
  await elem.moveTo(intX, intY);
}


/**
* Open the given URL
* @param  {String}   type Type of navigation (url or site)
* @param  {String}   page The URL to navigate to
*/
const openWebsite = async (type, page) => {
  const url = (type === 'url') ? page : browser.options.baseUrl + page;
  await browser.url(url);
}


/**
* Pause execution for a given number of milliseconds
* @param  {String}   ms   Number of milliseconds to pause
*/
const pause = async (ms) => {
  const intMs = parseInt(ms, 10);
  await browser.pause(intMs);
}


/**
* Perform a key press
* @param  {String}   key  The key to press
*/
const pressButton = async (key) => {
  await browser.keys(key);
}


/**
* Scroll the page to the given element
* @param  {String}   selector Element selector
*/
const scroll = async (selector) => {
  const elem = await browser.$(selector);
  await elem.scrollIntoView();
}


/**
* Select an option of a select element
* @param  {String}   selectionType  Type of method to select by (name, value or
*                                   text)
* @param  {String}   selectionValue Value to select by
* @param  {String}   selector     Element selector
*/
const selectOption = async (
  selectionType,
  selectionValue, selector,
) => {
  let command = '';
  const commandArguments = [selectionValue];

  switch (selectionType) {
    case 'name': {
      command = 'selectByAttribute';

      // The selectByAttribute command expects the attribute name as it
      // second argument so let's add it
      commandArguments.unshift('name');

      break;
    }

    case 'value': {
      // The selectByAttribute command expects the attribute name as it
      // second argument so let's add it
      commandArguments.unshift('value');
      command = 'selectByAttribute';
      break;
    }

    case 'text': {
      command = 'selectByVisibleText';
      break;
    }

    default: {
      throw new Error(`Unknown selection type "${selectionType}"`);
    }
  }

  let elem = await browser.$(selector);
  await elem[command](...commandArguments);
}


/**
* Select a option from a select element by it's index
* @param  {String}   index      The index of the option
* @param  {String}   selector Element selector
*
* @todo  merge with selectOption
*/
const selectOptionByIndex = async (index, selector) => {
  const optionIndex = parseInt(index, 10);
  let elem = await browser.$(selector)
  await elem.selectByIndex(optionIndex);
}


/**
 * Set a given cookie to a given value. When the cookies does not exist it will
 * be created
 * @param  {String}   cookieName    The name of the cookie
 * @param  {String}   cookieContent The value of the cookie
 */
const setCookie = async (cookieName, cookieContent) => {
  await browser.setCookies({
    name: cookieName,
    value: cookieContent,
  });
}


/**
 * Resize the browser window
 * @param  {String}   screenWidth  The width of the window to resize to
 * @param  {String}   screenHeight The height of the window to resize to
 */
const setWindowSize = async (screenWidth, screenHeight) => {
  await browser.setWindowSize(
    parseInt(screenWidth, 10),
    parseInt(screenHeight, 10),
  );
}


const switchToFrame = async (selector) => {
  const elem = await browser.$(selector);
  await browser.switchToFrame(elem);
}


/**
 * Wait for the given element to be enabled, displayed, or to exist
 * @param  {String}   selector                  Element selector
 * @param  {String}   ms                       Wait duration (optional, default 3000)
 * @param  {String}   state                    State to check for (default
  * @param  {String}   falseState               Check for opposite state
 *                                             existence)
 */
const waitFor = async (selector, ms, state, falseState) => {
  // Maximum number of milliseconds to wait, default 3000
  const intMs = parseInt(ms, 10) || timeout;

  // Command to perform on the browser object
  let command = 'waitForExist';

  let boolFalseState = !!falseState;
  let parsedState = '';

  if (falseState || state) {
    parsedState = state.includes(' ')
      ? state.split(/\s/)[state.split(/\s/).length - 1]
      : state;

    if (parsedState) {
      command = `waitFor${parsedState[0].toUpperCase()}`
        + `${parsedState.slice(1)}`;
    }
  }

  if (typeof falseState === 'undefined') {
    boolFalseState = false;
  }

  let elem = await browser.$(selector)
  await elem[command](intMs, boolFalseState);
}


/**
* Wait for the given element to become visible
* @param  {String}   selector      Element selector
* @param  {String}   falseCase Whether or not to expect a visible or hidden
*                              state
*/
const waitForDisplayed = async (selector, falseCase) => {
  const ms = timeout;
  let elem = await browser.$(selector)
  await elem.waitForDisplayed(ms, !!falseCase);
}


export const useraction = { closeAllButFirstTab, closeLastOpenedWindow, deleteCookies, dragElement, focusLastOpenedWindow, handleModal, moveTo, openWebsite, pause, pressButton, scroll, selectOption, selectOptionByIndex, setCookie, setInputField, setWindowSize, waitFor, switchToFrame, waitForDisplayed, clearInputField, clickElement }