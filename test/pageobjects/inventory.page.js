const Page = require("./page");
const SCREEN_SELECTOR = "#login_button_container";

class InventoryPage extends Page {
  constructor() {
    super(SCREEN_SELECTOR);
  }

  // Navbar button
  get btnMenuNavbar() {
    return $("#react-burger-menu-btn");
  }

  // Inventory button
  get btnInventoryMenu() {
    return $("#inventory_sidebar_link");
  }

  // list inventory stock with all properties
  get listInventoryItems() {
    return $$(".inventory_item");
  }

  // list name inventory
  get listInventoryItemsName() {
    return $$(".inventory_item_name");
  }

  //list inventory items price
  get listInventoryItemsPrice() {
    return $$(".inventory_item_price");
  }

  //list inventory selected
  get swagItems() {
    return $$(".inventory_item");
  }

  // cart button count badge
  get cart() {
    return $(".shopping_cart_link");
  }
  // items in a cart
  get cartItems() {
    return $$(".cart_item");
  }

  // filter select
  get productFilter() {
    return $(".product_sort_container");
  }

  // add to cart
  get addButton() {
    return $(".btn_primary.btn_inventory");
  }
  // remove from cart
  get removeButton() {
    return $(".btn_secondary.btn_inventory");
  }

  // back to main
  get goBackButton() {
    return $(".inventory_details_back_button");
  }
  //checkout my cart
  get checkoutButton() {
    return $(".checkout_button");
  }

  async getItemSelected() {
    return this.cart.getText();
  }
  /**
   * get Item sctock size array
   * @returns number
   */
  async getItemStock() {
    return this.listInventoryItems.length;
  }

  /**
   * Change Order Orientation
   * @param {*} text
   */
  async selectProductOrder(text) {
    this.productFilter.selectByVisibleText(text);
  }

  /**
   * getItemInCart
   * @returns array size number
   */
  async getItemInCart() {
    return this.cartItems.length;
  }

  /**
   * AddingProductsbyId
   * @param {*} index
   */
  async AddingProductsbyId(index) {
    //opening view
    this.openDetailView(index);
    await browser.pause(2000);

    //adding to cart
    this.addToCart();
    await browser.pause(2000);

    //back to main menu
    this.goBack();
    await browser.pause(2000);
  }

  /**
   * RemoveProductsbyIds
   * @param {*} index
   */
  async RemoveProductsbyId(index) {
    //opening view
    this.openDetailView(index);
    await browser.pause(2000);

    //adding to cart
    this.removeFromCart();
    await browser.pause(2000);

    //back to main menu
    this.goBack();
    await browser.pause(2000);
  }

  /**
   * Open detail view of the item
   * @param {*} index
   */
  openDetailView(index) {
    this.listInventoryItems[index].$(".inventory_item_name").click();
  }

  /**
   * Open Navbar click
   */
  openMenu() {
    this.btnMenuNavbar.click();
  }

  /**
   * click Navbar inventory item click
   */
  openInventory() {
    this.btnInventoryMenu.click();
  }
  /**
   * Go to checkout click event
   */
  goToCheckout() {
    this.checkoutButton.click();
  }

  /**
   * add element to Cart event click
   */
  addToCart() {
    this.addButton.click();
  }

  /**
   * remove From Cart event click
   */
  removeFromCart() {
    this.removeButton.click();
  }

  /**
   * open Cart event click
   */
  openCart() {
    this.cart.click();
  }

  /**
   * Go back event click
   */
  goBack() {
    this.goBackButton.click();
  }

  /**
   * Find Elment in items collection arrat
   * @param {*} needle
   * @returns position of the element
   */
  findingName(needle) {
    if (typeof needle === "string") {
      return this.swagItems.find((swagItem) =>
        swagItem.getText().includes(needle)
      );
    }

    return this.swagItems[needle];
  }

  /**
   * Get Text name of the especific element by index
   * @param {*} needle
   * @returns   name of the especific element by index
   */
  async getItemName(needle) {
    return this.findingName(needle).getText();
  }
}

module.exports = new InventoryPage();
