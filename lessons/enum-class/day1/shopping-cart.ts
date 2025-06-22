/*

## ทำระบบ Shopping Cart

*/

enum ProductCategory {
  Electronics,
  Clothing,
  Groceries,
}

class Product {
  name: string;
  category: ProductCategory;
  price: number;

  constructor(name: string, category: ProductCategory, price: number) {
    this.name = name;
    this.category = category;
    this.price = price;
  }
}

class CartItem {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  getItemTotal(): number {
    return this.product.price * this.quantity;
  }

  print(): string {
    return `${this.quantity} x ${this.product.price} (${ProductCategory[this.product.category]}) - ${this.getItemTotal()}`;
  }
}

class ShoppingCart {
  items: CartItem[] = [];

  addProduct(product: Product, quantity: number): void {
    const existingItem = this.items.find((item) => item.product.name === product.name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new CartItem(product, quantity));
    }
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + item.getItemTotal(), 0);
  }

  printCart(): void {
    this.items.forEach((item) => console.log(item.print()));
  }
}

const cart = new ShoppingCart();
const phone = new Product("iPhone", ProductCategory.Electronics, 30000);
const shirt = new Product("T-Shirt", ProductCategory.Clothing, 250);

cart.addProduct(phone, 1);
cart.addProduct(shirt, 8);
cart.addProduct(phone, 1);

cart.printCart();

console.log("Total:", cart.getTotalPrice(), "THB");
