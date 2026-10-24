// const { Builder, By, until } = require("selenium-webdriver");
// const assert = require("assert");
// const chrome = require("selenium-webdriver/chrome");

// describe("Open Sauce Demo", function () {
//     it("Should login and display shopping cart", async function () {
//         let options = new chrome.Options();

//         options.addArguments("--disable-features=PasswordLeakDetection");

//         options.setUserPreferences({
//             "credentials_enable_service": false,
//             "profile.password_manager_enabled": false,
//             "profile.password_manager_leak_detection": false
//         });

//         let driver = await new Builder()
//             .forBrowser("chrome")
//             .setChromeOptions(options)
//             .build();

//         await driver.get("https://www.saucedemo.com");

//         let usernameInput = await driver.findElement(
//             By.id("user-name")
//         );
//         let passwordInput = await driver.findElement(
//             By.id("password")
//         );
//         let loginButton = await driver.findElement(
//             By.id("login-button")
//         );

//         await usernameInput.sendKeys("standard_user");
//         await passwordInput.sendKeys("secret_sauce");
//         await loginButton.click();

//         // Assert 1: Ambil button shopping cart
//         let shoppingCart = await driver.wait(
//             until.elementLocated(
//                 By.xpath("//*[@data-test='shopping-cart-link']")
//             ),
//             10000
//         );
//     });
// });
// ```[cite: 3]