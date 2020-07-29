( () => {
  let cart = [];

  const pizzaMenu = getPizzaMenu()
  console.log(pizzaMenu);
  const drinkMenu = getDrinkMenu()
  console.log(drinkMenu);
  const chosenPizza = choosePizza(pizzaMenu)
  console.log(chosenPizza);
  const chosenDrink = chooseDrink(drinkMenu)
  console.log(chosenDrink);
  addItemToCart(chosenPizza)    // async call
  addItemToCart(chosenDrink)    // async call
  orderItems()

  /**
   * ピザメニューを取得
   */
  function getPizzaMenu() {
    return fetch('./pizza.json')
      .then((response) => response.json())
  }

  /**
   * ドリンクメニューを取得
   */
  function getDrinkMenu() {
    return fetch('./drink.json')
      .then((response) => response.json())
  }

  /**
   * ピザを選ぶ
   */
  function choosePizza() {
    return getRandomValue(pizzaMenu);
  }

  /**
   * ドリンクを選ぶ
   */
  function chooseDrink() {
    return getRandomValue(drinkMenu);
  }

  /**
   * 商品をカートに加える
   */
  function addItemToCart(item) {
    return cart.push(item);
  }
  
  /**
   * カートの中身を見る
   */
  function orderItems() {
    return console.log(cart);
  }

  /**
   * 配列の要素をランダムに取得する
   */
  function getRandomValue(arr) {
    let result = null;
    if (arr.length > 0) {
      result = arr[Math.floor(Math.random() * arr.length)];
    }
    return result;
  }
})()