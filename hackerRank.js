const puppeteer = require("puppeteer");
let {email, password} = require('./secret');
let currentTab;
let puppeteerOpenPromises = puppeteer.launch({
    headless: false,        // by default trur
    defaultViewport:null,
    args:["--start-maximized"]     // throught this it open full size in browser

    // for open in chrome
    // chrome://version/            open it copy and paste the path
    // executablePath: "C:\Program Files\Google\Chrome\Application\chrome.exe",
});
puppeteerOpenPromises
.then(function(browser){
    console.log("new browser is open");
    // console.log(browser);
    let allTabPromises = browser.pages();
    return allTabPromises;
})
.then(function(allTabs){
    currentTab = allTabs[0];
    console.log("new Tab");
   // URL to navigate page to
    let visitingLoginPagePromises = currentTab.goto("https://www.hackerrank.com/auth/login");
    return visitingLoginPagePromises;
})
.then(function(){
    console.log("Open HackerRank Login Page");
    let emailWillBeTyped = currentTab.type("input[name='username']", email);
    return emailWillBeTyped;
})
.then(function(){
    console.log("email is typed");
    let passwordIsTyped = currentTab.type("input[name='password']", password);
    return passwordIsTyped;
})
.then(function(){
    console.log("password is typed");
    let willBeLoggedInPromises = currentTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return willBeLoggedInPromises;
})
.then(function(){
    console.log("🫡🫡🫡HackerRank is opened 🙂🙂🙂");
    let algorithmTabWillOPenPromises = waitAndClick("div[data-automation='algorithms']");
    return algorithmTabWillOPenPromises;
})
.then(function(){
    console.log("Algorithm page is opened");
    let allQuestionsPromise = currentTab.waitForSelector(
        'a[data-analytices="ChallengedListChallengeName"]'
    );
    return allQuestionsPromise;
})
.then(function(){
    function getAllQuesLinks(){
        let allElemArr = document.querySelectorAll(
            'a[data-analytices="ChallengedListChallengeName"]'
        );
        let linkArr = [];
        for(let i = 0; i < allElemArr.length; i++){
            linkArr.push(allElemArr[i].getAttribute("href"));
        }
        return linkArr;
    }
    let linksArrPromise = currentTab.evaluate(getAllQuesLinks);
    return linksArrPromise;
})
.then(function(linkArr){
    console.log("links to all ques received");
    console.log(linkArr);
})
.catch(function(err){
    console.log(err);
})

function waitAndClick(algoLink){
    let myPromise= new Promise(function(resolve, reject){
        let waitForSelectorPromise = currentTab.waitForSelector(algoLink);
        waitForSelectorPromise
        .then(function(){
            let openAlogrithmPromise = currentTab.click(algoLink);
            return openAlogrithmPromise;
        })
        .then(function(){
            console.log("algo button is clicked");
            resolve();
        })
        .catch(function(err){
            console.log(err);
        })
    });
    return myPromise;
}

