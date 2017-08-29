import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Customer e2e test', () => {

    let navBarPage: NavBarPage;
    let customerDialogPage: CustomerDialogPage;
    let customerComponentsPage: CustomerComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customer');
        customerComponentsPage = new CustomerComponentsPage();
        expect(customerComponentsPage.getTitle()).toMatch(/testApp.customer.home.title/);

    });

    it('should load create Customer dialog', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage = new CustomerDialogPage();
        expect(customerDialogPage.getModalTitle()).toMatch(/testApp.customer.home.createOrEditLabel/);
        customerDialogPage.close();
    });

   /* it('should create and save Customers', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage.setFirstNameInput('firstName');
        expect(customerDialogPage.getFirstNameInput()).toMatch('firstName');
        customerDialogPage.setMidleNameInput('midleName');
        expect(customerDialogPage.getMidleNameInput()).toMatch('midleName');
        customerDialogPage.setSecondNameInput('secondName');
        expect(customerDialogPage.getSecondNameInput()).toMatch('secondName');
        customerDialogPage.setPhoneInput('phone');
        expect(customerDialogPage.getPhoneInput()).toMatch('phone');
        customerDialogPage.setEmailInput('email');
        expect(customerDialogPage.getEmailInput()).toMatch('email');
        customerDialogPage.companySelectLastOption();
        customerDialogPage.save();
        expect(customerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerDialogPage {
    modalTitle = element(by.css('h4#myCustomerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    midleNameInput = element(by.css('input#field_midleName'));
    secondNameInput = element(by.css('input#field_secondName'));
    phoneInput = element(by.css('input#field_phone'));
    emailInput = element(by.css('input#field_email'));
    companySelect = element(by.css('select#field_company'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput = function (firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function () {
        return this.firstNameInput.getAttribute('value');
    }

    setMidleNameInput = function (midleName) {
        this.midleNameInput.sendKeys(midleName);
    }

    getMidleNameInput = function () {
        return this.midleNameInput.getAttribute('value');
    }

    setSecondNameInput = function (secondName) {
        this.secondNameInput.sendKeys(secondName);
    }

    getSecondNameInput = function () {
        return this.secondNameInput.getAttribute('value');
    }

    setPhoneInput = function (phone) {
        this.phoneInput.sendKeys(phone);
    }

    getPhoneInput = function () {
        return this.phoneInput.getAttribute('value');
    }

    setEmailInput = function (email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function () {
        return this.emailInput.getAttribute('value');
    }

    companySelectLastOption = function () {
        this.companySelect.all(by.tagName('option')).last().click();
    }

    companySelectOption = function (option) {
        this.companySelect.sendKeys(option);
    }

    getCompanySelect = function () {
        return this.companySelect;
    }

    getCompanySelectedOption = function () {
        return this.companySelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
