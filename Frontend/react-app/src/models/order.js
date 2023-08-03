export class Order{
    constructor(obj) {
        this.id = obj.id;
        this.deliveryAddress = obj.deliveryAddress;
        this.comment = obj.comment;
        this.orderTime = obj.orderTime;
        this.deliveryTime = obj.deliveryTime;
        this.isCancelled = obj.isCancelled;
        this.orderPrice = obj.orderPrice;
        this.items = obj.items.map((o) => new ItemModel(o));
      }
}