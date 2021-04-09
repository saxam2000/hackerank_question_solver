let puppeteer = require("puppeteer");
let { codes } = require("./code");
let { email, password } = require("./secrets");
(async function fn() {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    })

    let newtab = await browser.newPage();
    gtab = newtab;
    await gtab.goto("https://www.hackerrank.com/auth/login"); //go to hackerrank login page
    await gtab.type('input[placeholder="Your username or email"]', email, { delay: 10 });
    await gtab.type('input[placeholder="Your password"]', password, { delay: 10 });
    await gtab.keyboard.press("Enter")
    await waitandclick(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
    await waitandclick(".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled");

    let url = gtab.url();
    purl = url;
    console.log(url + "\n" + purl);
    for (let i = 0; i < codes.length; i++) {
        let quesobj = codes[i];
        await questionSolver(purl, quesobj.qname, quesobj.soln)
    }
})();


async function waitandclick(selector) {

    await gtab.waitForSelector(selector);
    let elementclickedPromise = gtab.click(selector);
    return elementclickedPromise;

}
async function questionSolver(url, ques, code) {

    await gtab.goto(url);

    await gtab.evaluate(browserconsolefn, ques);

    function browserconsolefn(ques) {
        let h4Array = document.querySelectorAll("h4");
        let quesname = []
        for (let i = 0; i < h4Array.length; i++) {
            quesname.push(h4Array[i].innerText.split("\n")[0]);
        }
        let idx = quesname.indexOf(ques);
        console.log("hello")
        console.log(idx);
        h4Array[idx].click();
    }
    await waitandclick(".custom-input-checkbox");

    await gtab.type(".custominput", code);
    await gtab.keyboard.down("Control");
    await gtab.keyboard.press("a");
    await gtab.keyboard.press("x");
    await gtab.click(".monaco-editor.no-user-select.vs");
    await gtab.keyboard.press("a");
    await gtab.keyboard.press("v");
    await gtab.keyboard.up("Control");

    let submitWillBeClickedPromise = gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
    return submitWillBeClickedPromise;
}