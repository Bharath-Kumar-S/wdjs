import { expect } from 'chai';

/**
 * Check if the given element is (not) visible
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Check for a visible or a hidden element
 */
const isDisplayed = async (selector, falseCase) => {
    let elem = await browser.$(selector);
    const displayed = await elem.isDisplayed();
    if (falseCase) {
        expect(displayed).to.not
            .equal(true, `Expected element "${selector}" not to be displayed`);
    } else {
        expect(displayed).to
            .equal(true, `Expected element "${selector}" to be displayed`);
    }
}


/**
 * Check if the given selector is enabled
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the given selector is enabled or not
 */
const isEnabled = async (selector, falseCase) => {
    let elem = await browser.$(selector);
    const enabled = await elem.isEnabled();
    if (falseCase) {
        expect(enabled).to.not
            .equal(true, `Expected element "${selector}" not to be enabled`);
    } else {
        expect(enabled).to
            .equal(true, `Expected element "${selector}" to be enabled`);
    }
}


/**
* Check if the given element exists in the current DOM
* @param  {String}   selector  Element selector
* @param  {String}   falseCase Whether to check if the element exists or not
*/
const isExisting = async (selector, falseCase) => {
    const elements = await browser.$$(selector);
    if (falseCase) {
        expect(elements).to.have
            .lengthOf(0, `Expected element "${selector}" not to exist`);
    } else {
        expect(elements).to.have.length
            .above(0, `Expected element "${selector}" to exist`);
    }
}


/**
 * Compare the contents of two elements with each other
 * @param  {String}   selector1  Element selector for the first element
 * @param  {String}   selector2  Element selector for the second element
 * @param  {String}   falseCase Whether to check if the contents of both
 *                              elements match or not
 */
const compareText = async (selector1, selector2, falseCase) => {
    const elem1 = await browser.$(selector1)
    const text1 = await elem1.getText();
    const elem2 = await browser.$(selector2)
    const text2 = await elem2.getText();

    if (falseCase) {
        expect(text1).to.not.equal(
            text2,
            `Expected text not to be "${text1}"`,
        );
    } else {
        expect(text1).to.equal(
            text2,
            `Expected text to be "${text1}" but found "${text2}"`,
        );
    }
}


/**
* Check if the given element is visible inside the current viewport
* @param  {String}   selector   Element selector
* @param  {String}   falseCase Whether to check if the element is visible
*                              within the current viewport or not
*/
const checkWithinViewport = async (selector, falseCase) => {
    const elem = await browser.$(selector);
    const isDisplayed = await elem.isDisplayedInViewport();

    if (falseCase) {
        expect(isDisplayed).to.not
            .equal(
                true,
                `Expected element "${selector}" to be outside the viewport`,
            );
    } else {
        expect(isDisplayed).to
            .equal(
                true,
                `Expected element "${selector}" to be inside the viewport`,
            );
    }
}


/**
* Check if the current URL path matches the given path
* @param  {String}   falseCase    Whether to check if the path matches the
*                                 expected value or not
* @param  {String}   expectedPath The expected path to match against
*/
const checkUrlPath = async (falseCase, expectedPath) => {
    let currentUrl = await browser.getUrl().replace(/http(s?):\/\//, '');
    const domain = `${currentUrl.split('/')[0]}`;

    currentUrl = currentUrl.replace(domain, '');

    if (falseCase) {
        expect(currentUrl).to.not
            .equal(expectedPath, `expected path not to be "${currentUrl}"`);
    } else {
        expect(currentUrl).to
            .equal(
                expectedPath,
                `expected path to be "${expectedPath}" but found "${currentUrl}"`,
            );
    }
}


/**
 * Check if the given element exists in the DOM one or more times
 * @param  {String}  selector  Element selector
 * @param  {Number}  exactly  Check if the element exists exactly this number
 *                            of times
 * @param  {Boolean} falseCase Check if the element (does not) exists
 */

const checkIfElementExists = async (selector, exactly, falseCase) => {
    const nrOfElements = await browser.$$(selector);

    if (falseCase === true) {
        expect(nrOfElements).to.have.lengthOf(
            0,
            `Element with selector "${selector}" should not exist on the page`,
        );
    } else if (exactly) {
        expect(nrOfElements).to.have.lengthOf(
            exactly,
            `Element with selector "${selector}" should exist exactly ${exactly} time(s)`,
        );
    } else {
        expect(nrOfElements).to.have.length.of.at.least(
            1,
            `Element with selector "${selector}" should exist on the page`,
        );
    }
}


/**
 * Check the selected state of the given element
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the element is elected or not
 */
const checkSelected = async (selector, falseCase) => {
    const elem = await browser.$(selector);
    const isSelected = await elem.isSelected();

    if (falseCase) {
        expect(isSelected).to.not
            .equal(true, `"${selector}" should not be selected`);
    } else {
        expect(isSelected).to
            .equal(true, `"${selector}" should be selected`);
    }
}


/**
* Check the URL of the given browser window
* @param  {String}   expectedUrl The expected URL to check against
* @param  {String}   falseCase   Whether to check if the URL matches the
*                                expected value or not
*/
const checkUrl = async (expectedUrl, falseCase) => {
    const currentUrl = await browser.getUrl();

    if (falseCase) {
        expect(currentUrl).to.not
            .equal(expectedUrl, `expected url not to be "${currentUrl}"`);
    } else {
        expect(currentUrl).to
            .equal(
                expectedUrl,
                `expected url to be "${expectedUrl}" but found "${currentUrl}"`,
            );
    }
}


/**
 * Check the title of the current browser window contains expected text/title
 * @param  {Type}     falseCase     Whether to check if the title contains the
 *                                  expected value or not
 * @param  {Type}     expectedTitle The expected title
 */
const checkTitleContains = async (falseCase, expectedTitle) => {
    const title = await browser.getTitle();

    if (falseCase) {
        expect(title).to.not
            .contain(
                expectedTitle,
                `Expected title not to contain "${expectedTitle}"`,
            );
    } else {
        expect(title).to
            .contain(
                expectedTitle,
                `Expected title to contain "${expectedTitle}" but found "${title}"`,
            );
    }
}

/**
* Check the title of the current browser window
* @param  {Type}     falseCase     Whether to check if the title matches the
*                                  expected value or not
* @param  {Type}     expectedTitle The expected title
*/
const checkTitle = async (falseCase, expectedTitle) => {
    const title = await browser.getTitle();

    if (falseCase) {
        expect(title).to.not
            .equal(
                expectedTitle,
                `Expected title not to be "${expectedTitle}"`,
            );
    } else {
        expect(title).to
            .equal(
                expectedTitle,
                `Expected title to be "${expectedTitle}" but found "${title}"`,
            );
    }
}


/**
* Check if the given element has the given class
* @param  {String}   selector          Element selector
* @param  {String}   expectedClassName The class name to check
* @param  {String}   falseCase         Whether to check for the class to exist
*                                      or not ('has', 'does not have')
*/
const checkClass = async (selector, expectedClassName, falseCase) => {
    const elem = await browser.$(selector)
    const classesList = elem.getAttribute('class').split(' ');

    if (falseCase === 'does not have') {
        expect(classesList).to.not
            .include(expectedClassName,
                `Element ${selector} should not have the class `
                + `${expectedClassName}`);
    } else {
        expect(classesList).to
            .include(
                expectedClassName,
                `Element ${selector} should have the class ${expectedClassName}`,
            );
    }
}


/**
* Check if the given elements contains text
* @param  {String}   elementType   Element type (element or button)
* @param  {String}   selector      Element selector
* @param  {String}   falseCase     Whether to check if the content contains text or not
*/
const checkContainsAnyText = async (elementType, selector, falseCase) => {
    let command = 'getValue';

    if (elementType === 'button' || $(selector).getAttribute('value') === null) {
        command = 'getText';
    }

    let boolFalseCase;
    const elem = await browser.$(selector);
    const text = await elem[command]();

    if (typeof falseCase === 'undefined') {
        boolFalseCase = false;
    } else {
        boolFalseCase = !!falseCase;
    }

    if (boolFalseCase) {
        expect(text).to.equal('');
    } else {
        expect(text).to.not.equal('');
    }
}



/**
* Check if the given elements contains text
* @param  {String}   elementType   Element type (element or button)
* @param  {String}   selector      Element selector
* @param  {String}   falseCase     Whether to check if the content contains the given text or not
* @param  {String}   expectedText  The text to check against
*/
const checkContainsText = async (
    elementType,
    selector,
    falseCase,
    expectedText,
) => {
    let elem = await browser.$(selector);
    let command = 'getValue';

    if (
        ['button', 'container'].includes(elementType)
        || elem.getAttribute('value') === null
    ) {
        command = 'getText';
    }

    let boolFalseCase;
    let stringExpectedText = expectedText;

    elem.waitForDisplayed();
    const text = await elem[command]();

    if (typeof expectedText === 'undefined') {
        stringExpectedText = falseCase;
        boolFalseCase = false;
    } else {
        boolFalseCase = (falseCase === ' not');
    }

    if (boolFalseCase) {
        expect(text).to.not.contain(stringExpectedText);
    } else {
        expect(text).to.contain(stringExpectedText);
    }
}


/**
* Check the content of a cookie against a given value
* @param  {String}   name          The name of the cookie
* @param  {String}   falseCase     Whether or not to check if the value matches or not
* @param  {String}   expectedValue The value to check against
*/
const checkCookieContent = async (name, falseCase, expectedValue) => {
    const cookie = await browser.getCookies([name])[0];
    expect(cookie.name).to.equal(
        name,
        `no cookie found with the name "${name}"`,
    );

    if (falseCase) {
        expect(cookie.value).to.not
            .equal(
                expectedValue,
                `expected cookie "${name}" not to have value "${expectedValue}"`,
            );
    } else {
        expect(cookie.value).to
            .equal(
                expectedValue,
                `expected cookie "${name}" to have value "${expectedValue}" but got "${cookie.value}"`,
            );
    }
}


/**
* Check if a cookie with the given name exists
* @param  {String}   name      The name of the cookie
* @param  {String}   falseCase Whether or not to check if the cookie exists or not
*/
const checkCookieExists = async (name, falseCase) => {
    const cookie = await browser.getCookies([name]);

    if (falseCase) {
        expect(cookie.length).to.equal(
            0,
            `Expected cookie "${name}" not to exists but it does`,
        );
    } else {
        expect(cookie.length).to.not.equal(
            0,
            `Expected cookie "${name}" to exists but it does not`,
        );
    }
}


/**
* Check the dimensions of the given element
* @param  {String}   selector     Element selector
* @param  {String}   expectedSize Expected size
* @param  {String}   dimension    Dimension to check (broad or tall)
* @param  {String}   falseCase    Whether to check if the dimensions match or not
*/
const checkDimension = async (selector, expectedSize, dimension, falseCase) => {
    const elem = await browser.$(selector);
    const elementSize = await elem.getSize();
    const intExpectedSize = parseInt(expectedSize, 10);
    let originalSize = elementSize.height;
    let label = 'height';

    if (dimension === 'broad') {
        originalSize = elementSize.width;
        label = 'width';
    }

    if (falseCase) {
        expect(originalSize).to.not
            .equal(
                intExpectedSize,
                `Element "${selector}" should not have a ${label} of `
                + `${intExpectedSize}px`,
            );
    } else {
        expect(originalSize).to
            .equal(
                intExpectedSize,
                `Element "${selector}" should have a ${label} of `
                + `${intExpectedSize}px, but is ${originalSize}px`,
            );
    }
}


/**
* Check if the given elements text is the same as the given text
* @param  {String}   elementType   Element type (element or button)
* @param  {String}   selector       Element selector
* @param  {String}   falseCase     Whether to check if the content equals the
*                                  given text or not
* @param  {String}   expectedText  The text to validate against
*/
const checkEqualsText = async (elementType, selector, falseCase, expectedText) => {
    let command = 'getValue';
    let elem = await browser.$(selector);
    if (
        elementType === 'button'
        || elem.getAttribute('value') === null
    ) {
        command = 'getText';
    }

    let parsedExpectedText = expectedText;
    let boolFalseCase = !!falseCase;

    // Check for empty element
    if (typeof parsedExpectedText === 'function') {
        parsedExpectedText = '';

        boolFalseCase = !boolFalseCase;
    }

    if (parsedExpectedText === undefined && falseCase === undefined) {
        parsedExpectedText = '';
        boolFalseCase = true;
    }

    const text = elem[command]();

    if (boolFalseCase) {
        expect(parsedExpectedText).to.not.equal(text);
    } else {
        expect(parsedExpectedText).to.equal(text);
    }
}


/**
* Check if the given element has the focus
* @param  {String}   selector  Element selector
* @param  {String}   falseCase Whether to check if the given element has focus
*                              or not
*/
const checkFocus = async (selector, falseCase) => {
    const elem = await browser.$(selector);
    const hasFocus = await elem.isFocused();
    if (falseCase) {
        expect(hasFocus).to.not
            .equal(true, 'Expected element to not be focused, but it is');
    } else {
        expect(hasFocus).to
            .equal(true, 'Expected element to be focused, but it is not');
    }
}


/**
 * Check the given property of the given element
 * @param  {String}   isCSS         Whether to check for a CSS property or an
 *                                  attribute
 * @param  {String}   attrName      The name of the attribute to check
 * @param  {String}   elem          Element selector
 * @param  {String}   expectedValue The value to match against
 * @param  {String}   falseCase     Whether to check if the value of the
 *                                  attribute matches or not
 */
const checkFontProperty = async (
    isCSS,
    attrName,
    elem,
    expectedValue,
    falseCase
) => {
    const command = isCSS ? 'getCssProperty' : 'getAttribute';
    const attrType = (isCSS ? 'CSS attribute' : 'Attribute');
    let attributeValue = await browser[command](elem, attrName);

    // when getting something with a color or font-weight WebdriverIO returns a
    // object but we want to assert against a string
    if (/(font-size|line-height|display|font-weight)/.exec(attrName)) {
        attributeValue = attributeValue.value;
    }

    if (falseCase) {
        expect(attributeValue).to.not
            .equal(
                expectedValue,
                `${attrType}: ${attrName} of element "${elem}" should not `
                + `contain "${attributeValue}"`,
            );
    } else {
        expect(attributeValue).to
            .equal(
                expectedValue,
                `${attrType}: ${attrName} of element "${elem}" should contain `
                + `"${attributeValue}", but "${expectedValue}"`,
            );
    }
}


/**
* Check if the given string is in the URL path
* @param  {String}   falseCase       Whether to check if the given string is in
*                                    the URL path or not
* @param  {String}   expectedUrlPart The string to check for
*/
const checkInURLPath = async (falseCase, expectedUrlPart) => {
    const currentUrl = await browser.getUrl();

    if (falseCase) {
        expect(currentUrl).to.not
            .contain(
                expectedUrlPart,
                `Expected URL "${currentUrl}" not to contain `
                + `"${expectedUrlPart}"`,
            );
    } else {
        expect(currentUrl).to
            .contain(
                expectedUrlPart,
                `Expected URL "${currentUrl}" to contain "${expectedUrlPart}"`,
            );
    }
}


/**
* Check if the given element text is empty
* @param  {String}   elementType   Element type (element or button)
* @param  {String}   element      Element selector
* @param  {String}   falseCase     Whether to check if the content contains text or not
*/
const checkIsEmpty = async (elementType, element, falseCase) => {
    let newFalseCase = true;

    if (typeof falseCase === 'function') {
        newFalseCase = false;
    } else if (falseCase === ' not') {
        newFalseCase = false;
    }

    checkContainsAnyText(elementType, element, newFalseCase);
}


/**
* Check if the given URL was opened in a new window
* @param  {String}   expectedUrl The URL to check for
* @param  {String}   obsolete    Indicator for the type (window or tab) unused
*/
/* eslint @typescript-eslint/no-unused-vars: "off" */
const checkIsOpenedInNewWindow = async (expectedUrl, obsolete) => {
    const windowHandles = await browser.getWindowHandles();

    expect(windowHandles).length.to.not.equal(1, 'A popup was not opened');

    const lastWindowHandle = windowHandles.slice(-1);

    // Make sure we focus on the last opened window handle
    await browser.switchToWindow(lastWindowHandle[0]);

    const windowUrl = await browser.getUrl();

    expect(windowUrl).to
        .contain(expectedUrl, 'The popup has a incorrect getUrl');

    await browser.closeWindow();
}


/**
* Check if a modal was opened
* @param  {String}   modalType  The type of modal that is expected (alertbox,
*                               confirmbox or prompt)
* @param  {String}   falseState Whether to check if the modal was opened or not
*/
const checkModal = async (modalType, falseState) => {
    let promptText = '';

    try {
        promptText = await browser.getAlertText();

        if (falseState) {
            expect(promptText).to.not
                .equal(
                    null,
                    `A ${modalType} was opened when it shouldn't`,
                );
        }
    } catch (e) {
        if (!falseState) {
            expect(promptText).to
                .equal(
                    null,
                    `A ${modalType} was not opened when it should have been`,
                );
        }
    }
}


/**
* Check the text of a modal
* @param  {String}   modalType     The type of modal that is expected
*                                  (alertbox, confirmbox or prompt)
* @param  {String}   expectedText  The text to check against
* @param  {String}   falseState    Whether to check if the text matches or not
*/
const checkModalText = async (modalType, expectedText, falseState) => {
    try {
        const text = await browser.getAlertText();

        if (falseState) {
            expect(text).to.not.equal(
                expectedText,
                `Expected the text of ${modalType} not to equal `
                + `"${expectedText}"`,
            );
        } else {
            expect(text).to.equal(
                expectedText,
                `Expected the text of ${modalType} to equal `
                + `"${expectedText}", instead found "${text}"`,
            );
        }
    } catch (e) {
        expect.fail(`A ${modalType} was not opened when it should have been opened`);
    }
}


/**
* Check if a new window or tab is opened
* @param  {String}   falseCase Whether to check if a new window/tab was opened or not
*/
const checkNewWindow = async (falseCase) => {
    const windowHandles = await browser.getWindowHandles();

    if (falseCase) {
        expect(windowHandles.length).to
            .equal(1, 'A new window should not have been opened');
    } else {
        expect(windowHandles.length).to.not
            .equal(1, 'A new window has been opened');
    }
}


/**
* Check the offset of the given element
* @param  {String}   selector          Element selector
* @param  {String}   falseCase         Whether to check if the offset matches or not
* @param  {String}   expectedPosition  The position to check against
* @param  {String}   axis              The axis to check on (x or y)
*/
const checkOffset = async (selector, falseCase, expectedPosition, axis) => {
    const elem = await browser.$(selector);
    const location = await elem.getLocation(axis);
    const intExpectedPosition = parseFloat(expectedPosition);

    if (falseCase) {
        expect(location).to.not
            .equal(
                intExpectedPosition,
                `Element "${selector}" should not be positioned at `
                + `${intExpectedPosition}px on the ${axis} axis`,
            );
    } else {
        expect(location).to
            .equal(
                intExpectedPosition,
                `Element "${selector}" should be positioned at `
                + `${intExpectedPosition}px on the ${axis} axis, but was found `
                + `at ${location}px`,
            );
    }
}



/**
 * Set the text of the current prompt
 * @param  {String}   modalText The text to set to the prompt
 */
const setPromptText = async (modalText) => {
    try {
        await browser.sendAlertText(modalText);
    } catch (e) {
        expect.fail('A prompt was not open when it should have been open');
    }
}


export const check = { checkContainsText, checkCookieContent, checkCookieExists, checkDimension, checkEqualsText, checkFocus, checkFontProperty, checkInURLPath, checkIsEmpty, checkIsOpenedInNewWindow, checkModal, checkModalText, checkNewWindow, checkOffset, setPromptText, checkContainsAnyText, checkClass, checkTitle, checkTitleContains, checkUrlPath, checkWithinViewport, compareText, isExisting, isDisplayed, isEnabled, checkIfElementExists, checkSelected, checkUrl }; 