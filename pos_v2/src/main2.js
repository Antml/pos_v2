function printInventory (inputs)
{
  var allItems = loadAllItems();

  var buy = build_buys(allItems, inputs);

//  var bought_items = build_bought_item(allItems,buy);

//  var free = build_free(bought_items);
  var bought_items = new Build_bought_item(allItems,buy);
  bought_items.getObejects();

  var free = bought_items.build_free();
  var expectText = build_expectText(bought_items, free);

    console.log (expectText);

 }

 function build_buys(allItems, inputs){
   var buy = [];
   for (i=0;i<allItems.length;i++){
     buy[i]=0;

   }
   for(var i = 0; i < inputs.length;i++){
     for(var j = 0; j < allItems.length;j++){
       if(inputs[i].substring(0,10) === allItems[j].barcode){
         if (inputs[i].length > 10)
           buy[j] = inputs[i].substring(11,inputs[i].length)
         else
           buy[j]++;
       }

       }
   }
   return buy;
 }


 function build_expectText(bought_items, free)
{
  var expectText = "***<没钱赚商店>购物清单***\n";
  expectText +='打印时间：';
  expectText += currentDate();
  expectText += "----------------------\n";
  var sum = 0;
  var less = 0;
  for (var i = 0;i < bought_items.item.length; i++){

    if (bought_items.count[i] > 0){
      var real = bought_items.count[i] - free[i];
      expectText += "名称："+bought_items.item[i].name+ "，数量："+ bought_items.count[i]+
      bought_items.item[i].unit+ "，单价："+ bought_items.item[i].price.toFixed(2)
      +"(元)，小计："+ (bought_items.item[i].price*real).toFixed(2)+"(元)\n";
      sum += bought_items.item[i].price * real;
    }
  }
  expectText += "----------------------\n挥泪赠送商品：\n";
  for (var j =0;j< bought_items.item.length;j++){
    if (free[j]>0){
      expectText += "名称：" +bought_items.item[j].name+"，数量："
      + free[j]+bought_items.item[j].unit + "\n"
      less+= bought_items.item[j].price * free[j];
    }
  }

  expectText += "----------------------\n";
  expectText += "总计："+(sum).toFixed(2) + "(元)\n";
  expectText += "节省："+ (less).toFixed(2) + "(元)\n";
  expectText += "**********************";

  return expectText;
}
function currentDate(){
  var nowtime = new Date();

  var year = dateDigitToString(nowtime.getFullYear()),
      month = dateDigitToString(nowtime.getMonth() + 1),
      date = dateDigitToString(nowtime.getDate()),
      hour = dateDigitToString(nowtime.getHours()),
      minute = dateDigitToString(nowtime.getMinutes()),
      second = dateDigitToString(nowtime.getSeconds());

  return year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second + '\n';

}

function dateDigitToString(num) {
    return num < 10 ? '0' + num : num;
}
