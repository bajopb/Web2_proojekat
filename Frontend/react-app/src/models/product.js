export class Product {
    constructor(obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.price = obj.price;
      this.amount = obj.amount;
      this.description = obj.description;
      this.image = obj.image;
      this.imageFile = obj.imageFile;
      this.sellerId = obj.sellerId;
      this.seller = new Seller(obj.seller);
    }
  }