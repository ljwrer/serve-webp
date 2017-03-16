/**
 * Created by Ray on 2017/3/15.
 */
const parser = require('ua-parser-js');
const supportWebp = {
    browserList:[],
    addBrowser({major,name}){
        this.browserList.push({browser:{major,name}});
        return this
    },
    checkBrowser({browser}){
        return this.browserList.some(function (item) {
            const supportBrowser = item.browser;
            return browser.name === supportBrowser.name && browser.major >= supportBrowser.major;
        });
    },
    check(req){
        const ua = parser(req.headers['user-agent']);
        return this.checkBrowser(ua);
    }
};
supportWebp.addBrowser({
    major:"23",
    name:"Chrome"
}).addBrowser({
    major:"15",
    name:"Opera"
});
module.exports = supportWebp;