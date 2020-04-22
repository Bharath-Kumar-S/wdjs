const locators = {

    Internetcheckbox: {
        url: 'http://the-internet.herokuapp.com/',
        chexkboxlink: ["=ramya", "=Checkboxes"],
        firstcheckbox: ["input:nth-child(1)", "input:nth-child(1)", "//input[@type=\"checkbox\"]", "//form[@id=\"checkboxes\"]/input", "//input"],
        secondcheckbox: ["input:nth-child(3)", "input:nth-child(3)", "(//input[@type=\"checkbox\"])[2]", "//form[@id=\"checkboxes\"]/input[2]", "//input[2]"]
    },
    Internetdynamicontrols: {
        url: 'http://the-internet.herokuapp.com/',
        link: ["=Dynamic Controls", "=Dynamic Controls", "//a[contains(text(),\"Dynamic Controls\")]", "//a[contains(@href, \"/dynamic_controls\")]", "//a[contains(.,\"Dynamic Controls\")]"],
        checkbox: ["#checkbox > input", "#checkbox > input", "//input[@type=\"checkbox\"]", "//div[@id=\"checkbox\"]/input", "//input"],
        checkboxbtn: ["#checkbox-example > button", "#checkbox-example > button", "//button[@type=\"button\"]", "//form[@id=\"checkbox-example\"]/button", "//button", "//button[contains(.,\"Remove\")]"],
        alterbutton: ["button:nth-child(2)", "button:nth-child(2)", "(//button[@type=\"button\"])[2]", "//form[@id=\"input-example\"]/button", "//form[2]/button", "//button[contains(.,\"Enable\")]"],
        avbutton: ["#input-example", "#input-example", "#input-example", "//form[@id=\"input-example\"]", "//div[@id=\"content\"]/div/form[2]", "//form[2]"]
    },
    google: {
        url: 'https://www.google.com/',
        search: ["[name=\"q\"]", "[name=\"qa\"]", ".gLFyf", "//input[@name=\"q\"]", "//form[@id=\"tsf\"]/div[2]/div/div/div/div/input", "//div/div/input"],
        searchinput: 'Bharath spectron',
        resultslink: '//h3[contains(text(),"Bharath-Kumar-S")]'
    },
    slider: {
        url: 'http://the-internet.herokuapp.com/',
        sliderlink: ["=Horizontal Slider", "=Horizontal Slider", "li:nth-child(21) > a", "//a[contains(text(),\"Horizontal Slider\")]", "//div[@id=\"content\"]/ul/li[21]/a", "//a[contains(@href, \"/horizontal_slider\")]", "//li[21]/a", "//a[contains(.,\"Horizontal Slider\")]"],
        slider: ["input", "input", "//input[@value=\"0\"]", "//div[@id=\"content\"]/div/div/input", "//input"]
    }

}

const libs = {

}

export const page = { locators, libs };