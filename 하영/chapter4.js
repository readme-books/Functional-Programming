// 연습문제 풀어봄
function update_shopping_icons() {
  var buy_buttons = getbuy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var item = button.item;
    // if (item.price + shopping_cart_total >= 20) {
    //   button.show_free_shipping_icon();
    // } else {
    //   button.hide_free_shipping_icon();
    // }
    if (free_shipping(item, shopping_cart_total)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}

function free_shipping(price, shopping_price) {
  return price + shopping_price >= 20;
}
