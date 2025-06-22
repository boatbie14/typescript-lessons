enum TechCategory {
  Laptop,
  Smartphone,
  Accessory,
}

class TechProduct {
  name: string;
  price: number;
  type: TechCategory;

  constructor(name: string, price: number, type: TechCategory) {
    this.name = name;
    this.price = price;
    this.type = type;
  }
}

class PurchaseOrder {
  items: TechProduct[] = [];

  constructor(items: TechProduct[]) {
    this.items = items;
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, product) => sum + product.price, 0);
  }

  summary(customerName: string): string {
    return `Order Summary for ${customerName}:\n - Items: ${this.items.length}\n - Total: ${this.getTotalPrice()} THB`;
  }

  listByCategory(type: TechCategory): string[] {
    return this.items.filter((product) => product.type === type).map((p) => p.name);
  }
}

class TechCustomer {
  name: string;
  orders: PurchaseOrder[] = [];

  constructor(name: string) {
    this.name = name;
  }

  placeOrder(order: PurchaseOrder): void {
    this.orders.push(order);
  }
}

const p1 = new TechProduct("MacBook Pro", 40000, TechCategory.Laptop);
const p2 = new TechProduct("AirPods", 2000, TechCategory.Accessory);
const order1 = new PurchaseOrder([p1, p2]);
const customer = new TechCustomer("Alice");

customer.placeOrder(order1);

console.log(order1.summary(customer.name));
console.log("Products in category: Laptop");
console.log(order1.listByCategory(TechCategory.Laptop));
