/* 
#โจทย์: ระบบลงทะเบียนคลาสเรียนโยคะ (Yoga Class Booking System) - ระดับ 6.5/10

ให้เขียนระบบจำลองการจองคลาสเรียนโยคะ 

Output:
Booking Summary for Nina:
- Classes booked: 2
- Total: 1100 THB

Classes in type: Beginner
["Morning Flow"]

เงื่อนไข

- ต้องเช็กว่า class ว่างหรือไม่ (maxParticipants - currentBookings) ก่อนจะจอง
- ต้องรับ YogaClass ที่มีข้อมูลเกี่ยวกับ type ด้วย (enum)
- ต้องคิดว่าใช้ method ไหนเพื่อจัดการการจองให้ถูกต้อง

| Class Name        | Price (THB) | Type         | Max Participants | Current Participants |
|------------------|-------------|--------------|------------------|-----------------------|
| Morning Flow     | 900         | Beginner     | 15               | 13                    |
| Sunrise Stretch  | 1000        | Beginner     | 12               | 9                     |
| Core Strength    | 1200        | Intermediate | 12               | 7                     |
| Balance Boost    | 1100        | Intermediate | 10               | 10                    |
| Warrior Power    | 1300        | Advanced     | 8                | 6                     |
| Zen Mastery      | 1500        | Advanced     | 8                | 4                     |

*/

enum YogaType {
  Beginner,
  Intermediate,
  Advanced,
}

class YogaClass {
  name: string;
  price: number;
  type: YogaType;
  maxParticipants: number;
  currentParticipants: number;

  constructor(name: string, price: number, type: YogaType, maxParticipants: number, currentParticipants: number) {
    this.name = name;
    this.price = price;
    this.type = type;
    this.maxParticipants = maxParticipants;
    this.currentParticipants = currentParticipants;
  }

  hasAvailableSeats(): boolean {
    if (this.currentParticipants + 1 > this.maxParticipants) {
      return false;
    } else {
      return true;
    }
  }
}

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Booking {
  user: User;
  items: YogaClass[] = [];

  constructor(user: User) {
    this.user = user;
  }

  addBooking(bookingClass: YogaClass): void {
    if (bookingClass.hasAvailableSeats()) {
      this.items.push(bookingClass);
    }
  }

  summary(): string {
    const totalPrice: number = this.items.reduce((sum, item) => sum + item.price, 0);
    return `Booking Summary for ${this.user.name}:\n - Classes booked: ${this.items.length}\n - Total: ${totalPrice} THB`;
  }

  listByType(type: YogaType) {
    const classNameList = this.items.filter((item) => item.type === type).map((item) => item.name);
    return classNameList;
  }
}

const booking1 = new YogaClass("Morning Flow", 900, YogaType.Beginner, 15, 13);
const booking2 = new YogaClass("Balance Boost ", 1100, YogaType.Beginner, 10, 10);
const booking3 = new YogaClass("Sunrise Stretch", 1000, YogaType.Intermediate, 12, 9);

const user = new User("Boat");

const booking = new Booking(user);

booking.addBooking(booking1);
booking.addBooking(booking2);
booking.addBooking(booking3);

console.log(booking.summary());
console.log("Classes in type: Beginner");
console.log(booking.listByType(YogaType.Beginner));
