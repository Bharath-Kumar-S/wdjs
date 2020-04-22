import { assert } from 'chai';
import { homePage } from './homepage.page';


describe('Visual regression tests on the home page.', () => {
    before(async() => {
        await browser.url('http://automationpractice.com');
    });

    it('Displays logo on the home page.', function() {
        assert.equal(
            browser.checkElement(homePage.logoSite, this.test.title),
            0,
        );
    });

    it('Displays empty cart on the home page.', function() {
        assert.equal(browser.checkElement(homePage.cart, this.test.title), 0);
    });
});
