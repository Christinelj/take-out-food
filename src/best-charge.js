function bestCharge(selectedItems) {
  function splitSelectedItems(input) {
    var Items = [];
    Items[0] = input.split(' ')[0];
    Items[1] = parseInt(input.split(' ')[2]);
    return Items;
  }

  function beforeDiscountTotalAmount(splitedSelectedItems) {
    var allItems = loadAllItems();
    var beforeDiscountTotalPrice = 0;
    for (let i = 0; i < splitedSelectedItems.length; i++) {
      for (let j = 0; j < allItems.length; j++) {
        if (splitedSelectedItems[i][0] === allItems[j].id) {
          beforeDiscountTotalPrice += splitedSelectedItems[i][1] * allItems[j].price;
        }
      }
    }
    return beforeDiscountTotalPrice;
  }

  function checkDesignatedDishes(input) {
    var aboveDesignatedDishes = false;
    var promoteDishs = loadPromotions()[1].items;
    for (let j = 0; j < promoteDishs.length; j++) {
      if (input === promoteDishs[j]) {
        aboveDesignatedDishes = true;
      }
    }
    return aboveDesignatedDishes;
  }

  function preferentialTwoDiscount(input) {
    var allPromotions = loadPromotions();
    var allItems = loadAllItems();
    var discount = 0;
    var discountPrice = [[], []];
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < allPromotions[1].items.length; j++) {
        if (input[i][0] === (allPromotions[1].items)[j]) {
          for (let k = 0; k < allItems.length; k++) {
            if (input[i][0] === allItems[k].id) {
              discountPrice[0].push(input[i][0]);
              discountPrice[1].push(allItems[k].price / 2);
            }
          }
        }
      }
    }
    for (let i = 0; i < input.length; i++) {
      for (let m = 0; m < discountPrice[0].length; m++) {
        if (input[i][0] === discountPrice[0][m])
          discount += input[i][1] * discountPrice[1][m];
      }
    }
    return discount;
  }

  function comparePrize(sumOne, sumTwo) {
    var bestPrize = 0;
    if (sumOne > sumTwo) {
      bestPrize = sumTwo;
    } else {
      bestPrize = sumOne;
    }
    return bestPrize;
  }

  var splitedSelectedItems = [];
  for (let i = 0; i < selectedItems.length; i++) {
    splitedSelectedItems.push(splitSelectedItems(selectedItems[i]));
  }
  var beforeDiscountTotalPrice = 0;
  beforeDiscountTotalPrice = beforeDiscountTotalAmount(splitedSelectedItems);
  var orderDetail = []; var allItems = loadAllItems(); var Promotions = loadPromotions();
  for (let i = 0; i < splitedSelectedItems.length; i++) {
    for (let j = 0; j < allItems.length; j++) {
      if (splitedSelectedItems[i][0] === allItems[j].id) {
        splitedSelectedItems[i].push(allItems[j].name);
        splitedSelectedItems[i].push(allItems[j].price);
      }
    }
  }
  for (let i = 0; i < splitedSelectedItems.length; i++) {
    orderDetail += ('\n' + splitedSelectedItems[i][2] + ' x ' + splitedSelectedItems[i][1] + ' = ' + splitedSelectedItems[i][1] * splitedSelectedItems[i][3] + '元');
  }
  var sumOne = 0; var sumTwo = 0; var bestPrize = 0; var discountOne = 0; var discountTwo = 0; var result = '';
  var preference = '';
  if (beforeDiscountTotalPrice >= 30) {
    for (let j = 0; j < splitedSelectedItems.length; j++) {
      let dub = checkDesignatedDishes(splitedSelectedItems[j][0]);
      if (dub === true) {
        discountOne = Math.floor(beforeDiscountTotalPrice / 30) * 6;
        sumOne = parseInt(beforeDiscountTotalPrice - discountOne);
        discountTwo = preferentialTwoDiscount(splitedSelectedItems);
        sumTwo = parseInt(beforeDiscountTotalPrice - discountTwo);
        bestPrize = comparePrize(sumOne, sumTwo);
        if (bestPrize === sumOne) {
          result = '============= 订餐明细 =============' + orderDetail + '\n-----------------------------------\n使用优惠:\n'
            + '满30减6元，省' + discountOne + '元' + '\n-----------------------------------\n总计：'
            + bestPrize + '元\n===================================';
          break;
        }
        else {
          for (let i = 0; i < splitedSelectedItems.length; i++) {
            for (let j = 0; j < Promotions[1].items.length; j++) {
              if (splitedSelectedItems[i][0] === (Promotions[1].items)[j]) {
                preference += splitedSelectedItems[i][2] + '，';
              }
            }
          }
          preference = preference.substr(0, preference.length - 1)
          result = '============= 订餐明细 =============' + orderDetail + '\n-----------------------------------\n使用优惠:\n'
            + '指定菜品半价(' + preference + ')，省' + discountTwo + '元' + '\n-----------------------------------\n总计：'
            + bestPrize + '元\n===================================';
          break;
        }
      } else {
        discountOne = Math.floor(beforeDiscountTotalPrice / 30) * 6;
        bestPrize = parseInt(beforeDiscountTotalPrice - discountOne);
        result = '============= 订餐明细 =============' + orderDetail + '\n-----------------------------------\n使用优惠:\n'
          + '满30减6元，省' + discountOne + '元' + '\n-----------------------------------\n总计：'
          + bestPrize + '元\n===================================';
      }
    }
  }
  else {
    for (let j = 0; j < splitedSelectedItems.length; j++) {
      let dub = checkDesignatedDishes(splitedSelectedItems[j][0]);
      if (dub === true) {
        discountTwo = preferentialTwoDiscount(splitedSelectedItems);
        sumTwo = parseInt(beforeDiscountTotalPrice - discountTwo);
        for (let i = 0; i < splitedSelectedItems.length; i++) {
          for (let j = 0; j < Promotions[1].items.length; j++) {
            if (splitedSelectedItems[i][0] === (Promotions[1].items)[j]) {
              preference += splitedSelectedItems[i][2] + '，';
            }
          }
        }
        preference = preference.substr(0, preference.length - 1)
        result = '============= 订餐明细 =============' + orderDetail + '\n-----------------------------------\n使用优惠:\n'
          + '指定菜品半价(' + preference + ')，省' + discountTwo + '元' + '\n-----------------------------------\n总计：'
          + bestPrize + '元\n===================================';
      } else {
        bestPrize = beforeDiscountTotalPrice;
        result = '============= 订餐明细 =============' + orderDetail + '\n-----------------------------------' +
          '\n总计：' + bestPrize + '元\n===================================';
      }
    }
  }
  return result;
}
