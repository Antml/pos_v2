function Build_bought_item(allItems,buy){

  this.allItems = allItems;
  this.buy = buy;
  this.item = [];
  this.count = [];

}


Build_bought_item.prototype.getObejects = function(){

  for(var i=0; i<this.buy.length; i++){
    this.item.push(this.allItems[i]);
    this.count.push(this.buy[i]);
  }

};


Build_bought_item.prototype.build_free = function(){

  var free = [];
  var Pro = loadPromotions();
  for (var k=0;k<this.item.length;k++){
    free[k]=0;
  }
   for(var i = 0; i < Pro.length;i++){
       if (Pro[i].type === "BUY_TWO_GET_ONE_FREE"){
      for (var j = 0;j < this.item.length; j++){
        var Pro_barcodes = Pro[i].barcodes;
        for (var m =0 ;m < Pro_barcodes.length; m++){
          if (Pro_barcodes[m] === this.item[j].barcode)
              free[j] = parseInt(this.count[j]/3);
        }
      }
      break;
    }
  }
  return free;

};
