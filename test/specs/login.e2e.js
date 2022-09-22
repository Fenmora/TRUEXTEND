const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");
const inventory = require("../pageobjects/inventory.page");

describe("My Login application", () => {
  it("should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await expect(browser).toHaveTitle("Swag Labs");
  });

  it("inventory redirecting", async () => {
    expect(browser).toHaveUrl("/inventory.html");
  });

  it("Menu validation event and Click to Inventory", async () => {
    expect(await inventory.getItemStock()).toEqual(
      6,
      "Amount of items was not equal to 6"
    );
  });

  /**
   * Verify Sorting of items in stock
   */
  it("should be able to sort the items", async () => {
    //sorting by price high to low
    inventory.selectProductOrder("Price (high to low)");
    await browser.pause(5000);

    //looking for the product with major price
    expect(await inventory.listInventoryItemsName[0].getText()).toContain(
      "Sauce Labs Fleece Jacket",
      "Sorted order is not correct"
    );
    await browser.pause(3000);
  });

  /**
   * Adding to the cart from principal inventory page
   */
  it("should be able to Adding to the cart from principal inventory page", async () => {
    //Adding first product
    await inventory.AddingProductsbyId(5);

    expect(await inventory.getItemName(0)).toContain(
      "Sauce Labs Backpack",
      "Initial order is not correct"
    );

    //Adding second product
    await inventory.AddingProductsbyId(0);

    //Adding third product
    await inventory.AddingProductsbyId(3);

    //Adding Fourth product
    await inventory.AddingProductsbyId(4);

    //Removing second product
    await inventory.RemoveProductsbyId(0);

    expect(await inventory.getItemSelected()).toEqual(
      "3",
      "Amount of items was not equal to 3"
    );

    //open cart
    inventory.openCart();
    await browser.pause(3000);
  });
});
