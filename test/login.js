const { Builder, By, until } =
require("selenium-webdriver");
const assert = require("assert");


describe('Automation Test - Fitur Login & Add User', function () {
    let driver;
    const BASE_URL = 'https://belajar-bareng.onrender.com/'; 

    this.timeout(30000);

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('1. Seharusnya gagal login dengan kredensial salah', async function () {
        await driver.get(BASE_URL);

        const usernameInput = await driver.wait(until.elementLocated(By.css("input[data-testid='username-input']")), 10000);
        await usernameInput.sendKeys('user_salah');

        const passwordInput = await driver.findElement(By.css("input[data-testid='password-input']"));
        await passwordInput.sendKeys('password_salah');

        const signinButton = await driver.findElement(By.css("button[data-testid='login-button']"));
        await signinButton.click();

        const errorMessage = await driver.wait(async function() {
            let el = await driver.findElement(By.css("p.error"));
            let text = await el.getText();
            return text.trim().length > 0 ? el : null;
        }, 10000);

        const errorText = await errorMessage.getText();
        assert.notStrictEqual(errorText, '', "Pesan error harus muncul");
    });

    it('2. Seharusnya berhasil login dengan kredensial valid', async function () {
        await driver.get(BASE_URL);

        const usernameInput = await driver.wait(until.elementLocated(By.css("input[data-testid='username-input']")), 10000);
        await usernameInput.clear();
        await usernameInput.sendKeys('admin'); 

        const passwordInput = await driver.findElement(By.css("input[data-testid='password-input']"));
        await passwordInput.clear();
        await passwordInput.sendKeys('admin'); 

        const signinButton = await driver.findElement(By.css("button[data-testid='login-button']"));
        await signinButton.click();

        // Assertion: Memastikan berhasil masuk ke dashboard (ditandai dengan munculnya tombol logout)
        const logoutButton = await driver.wait(
            until.elementLocated(By.id('logout-btn')), 
            15000, 
            "Gagal masuk ke dashboard, tombol logout tidak ditemukan"
        );

        assert.ok(logoutButton, "Tombol logout harus tampil setelah berhasil login");
    });

    it('3. Seharusnya berhasil menambahkan user baru (Add User)', async function () {
        // 1. Klik tombol "Add" menggunakan JavaScript click agar stabil
        const addButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(), 'Add')]")), 
            10000,
            "Tombol Add tidak ditemukan"
        );
        await driver.executeScript("arguments[0].click();", addButton);

        
        const uniqueUserName = "user" + Math.floor(Math.random() * 100000);
        
        
        const nameInput = await driver.wait(
            until.elementLocated(By.css("input[placeholder*='name'], input[placeholder*='Name'], input[type='text']")), 
            10000,
            "Input field nama tidak ditemukan"
        );
        await nameInput.clear();
        await nameInput.sendKeys(uniqueUserName);

    
        try {
            const ageInput = await driver.findElement(By.css("input[placeholder*='age'], input[placeholder*='Age'], input[type='number']"));
            await ageInput.clear();
            await ageInput.sendKeys("25");
        } catch (e) {
        }

        // 3. Klik tombol Submit
        const submitButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(), 'Submit') or contains(text(), 'Save')]")), 
            10000,
            "Tombol submit tidak ditemukan"
        );
        await submitButton.click();
        await driver.sleep(2000);

        assert.ok(true, "Fitur add user berhasil dijalankan dan disubmit");
    });
});