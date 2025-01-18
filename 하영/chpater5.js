// 연습문제 1 기존코드
function add_item_to_cart(name, price) {
  shoopig_cart = add_item(shoopig_cart, name, price);
  calc_cart_total();
}
function calc_cart_total() {
  shopping_cart_total = clac_total(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons(shopping_cart);
  update_tax_dom();
}

function set_cart_total_dom() {}

function update_shopping_icons() {
  var buy_buttons = getbuy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var item = button.item;
    if (free_shipping(item, shopping_cart_total)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}
function update_tax_dom() {
  set_tax_dom(calc_tax(shopping_cart_total));
}

// 연습문제1 수정후

// 여기서 shopping_cart가 외부에서 선언된 전역변순줄 알고 인자로 바꿨음
function add_item_to_cart(name, price) {
  shoppig_cart = add_item(price, name, shopping_cart);
  calc_cart_total(shoppig_cart);
}

function calc_cart_total(cart) {
  var cart_total = calc_total(cart);
  set_cart_total_dom(cart_total);
  update_shipping_icons(cart);
  update_tax_dom(cart_total);
}

function set_cart_total_dom(cart_total) {
  //생략
}

function update_shopping_icons() {
  var buy_buttons = getbuy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var item = button.item[i];
    if (free_shipping(item, shopping_cart_total)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}
function update_tax_dom(cart_total) {
  set_tax_dom(calc_tax(cart_total));
}

// 연습문제2 기본코드
function update_shopping_icons1() {
  var buy_buttons = getbuy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (free_shipping(item, shopping_cart_total)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}

// 연습문제2 수정코드 -> 틀렸음 문제 이해 잘못함.

function update_shipping_icons2(cart) {
  var buy_buttons = getbuy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    var hasFreeShipping = gets_free_shipping_with_item(cart, item);
    set_free_shipping_icon(button, hasFreeShipping);
  }
}

function gets_free_shipping_with_item(cart, item) {
  var new_cart = add_item(cart, item);
  return gets_free_shipping(new_cart); //장바구니가 무료 배송이 필요한지 확인
}

function set_free_shipping_icon(button, isShown) {
  if (isShown) {
    button.show_free_shipping_icon();
  } else {
    button.hide_free_shipping_icon();
  }
}
