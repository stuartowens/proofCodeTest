const {Builder, By, Key, until} = require('selenium-webdriver');
require('chromedriver');
const webdriver = require('selenium-webdriver');
const expect = require('chai').expect;
const mocha = require('mocha');
const TIMEOUT = 30000
const assert = require('chai').assert



let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

const campaignExpectations = {
    "43.217.98.114" : "Austin.jpg",
    "101.247.100.229" : "SanFrancisco.jpg",
    "201.112.124.140" : "Sports.jpg",
    "253.231.118.198" : "Sports.jpg",
    "160.170.200.182" : "smb.jpg",
    "129.88.147.200" : "SanFrancisco.jpg",
    "154.85.159.174" : "Austin.jpg",
    "179.180.127.155" : "Software.png",
    "201.111.240.66" : "proof.png",
    "79.210.84.134" : "Sports.jpg"
};

//This function will be run to test whether the image that shows on the page after the member logs in with the IP addresss using
//both selenium and mocha chai to create expectations of the browsers

const functionalImageTest = function(ip, src) {
    let srcTarget = 'http://localhost:3000/images/'
    srcTarget = srcTarget.concat(src)
    describe('Member ' + ip + ' Test', () => {
      it('go to local host 3000 and login with member IP address ' + ip + 'to show an image with src tag of ' + srcTarget,async function example() {
        await driver.get('http://localhost:3000/home');
        await driver.findElement(By.id('memberIP')).sendKeys(ip, Key.RETURN);
        await driver.findElement(By.id('loginButton')).click();
        await driver.manage().setTimeouts( { implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT } )
        const srcTag = await driver.findElement(By.id('targetImg')).getAttribute("src");
        expect(srcTag).to.equal(srcTarget);
      })
    })
}

for (var key in campaignExpectations) {
    functionalImageTest(key, campaignExpectations[key]);
}
async () => driver.quit();
