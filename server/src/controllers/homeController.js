import db from "../models/index";
let getHomePage =  (req, res) => {
    return res.render("homePage.ejs")
}  

let getAdminPage =  (req, res) => {
    return res.render("adminPage.ejs")
}

export default {
    getHomePage: getHomePage,
    getAdminPage: getAdminPage,

};