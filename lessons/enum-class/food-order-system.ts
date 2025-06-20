/*  
#ระบบจัดการคำสั่งอาหาร (Food Order System)

สร้างระบบจำลองการสั่งอาหารหลายจาน โดยใช้ enum กำหนดประเภทอาหาร และเขียน method สรุปคำสั่ง

Output:

Boat ordered 3 items. Total: 450 THB.
["Ice Cream"]

*/

enum FoodCategory {
  Appetizer,
  MainCourse,
  Dessert,
}

class Food {
  name: string;
  price: number;
  category: FoodCategory;

  constructor(name: string, price: number, category: FoodCategory) {
    this.name = name;
    this.price = price;
    this.category = category;
  }
}

class Order {
  customerName: string;
  items: Food[] = [];

  constructor(customerName: string) {
    this.customerName = customerName;
  }

  addItem(food: Food): void {
    this.items.push(food);
  }

  summary(): string {
    const getTotalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
    return `${this.customerName} ordered ${this.items.length} items. Total: ${getTotalPrice} THB.`;
  }

  listByCategory(selectCat: FoodCategory): string[] {
    const foodInCat = this.items.filter((item) => item.category === selectCat).map((item) => item.name);
    return foodInCat;
  }
}

const food1 = new Food("Spring Rolls", 120, FoodCategory.Appetizer);
const food2 = new Food("Pad Thai", 180, FoodCategory.MainCourse);
const food3 = new Food("Ice Cream", 150, FoodCategory.Dessert);

const order = new Order("Boat");
order.addItem(food1);
order.addItem(food2);
order.addItem(food3);

console.log(order.summary()); // Boat ordered 3 items. Total: 450 THB.
console.log(order.listByCategory(FoodCategory.Dessert)); // ["Ice Cream"]
