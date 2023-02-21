const puppeteer = require("puppeteer");
let currTab;
let browserOpenPromise = puppeteer.launch({
    headless :false,
    defaultViewport : null,
    args:["--start-maximized"]
});
console.log(browserOpenPromise);
browserOpenPromise
.then(function(browser){
    console.log("browser is open");
    console.log(browserOpenPromise);
    let openAllPages = browser.pages();
    return openAllPages;
})
.then(function(allTabs){
    currTab = allTabs[0];
    
})