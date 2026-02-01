import { Login } from "../pages/Login";
import { HomePage } from "../pages/HomePage";

const loginPage = new Login();
const homePage = new HomePage();

describe("Page Object Homework", () => {

  it("Test Nº1: user888 login/logout", () => {
    loginPage.navigate();
    loginPage.login("user888@gmail.com", "1234567890");
    homePage.logout();
  });

  it("Test Nº2: testowyqa login/logout", () => {
    loginPage.navigate();
    loginPage.login("testowyqa@qa.team", "QA!automation-1");
    homePage.logout();
  });

});