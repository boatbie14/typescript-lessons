/*

### โจทย์ 1

สร้างระบบจองห้องพักโดยใช้ enum ระบุประเภทห้อง และ class เก็บข้อมูลการจอง

1. สร้าง enum RoomType: Standard, Deluxe, Suite

2. สร้าง class HotelBooking: 

- guestName: string
- roomType: RoomType
- nights: number
- totalPrice: number

3. กำหนดราคาต่อคืน:

- Standard = 1000
- Deluxe = 2000
- Suite = 3000

4. คำนวณ totalPrice จาก roomType × nights ใน constructor

5. สร้าง method printSummary() เช่น: 

Booking for Anna | Room: Deluxe | Nights: 2 | Total: 4000 THB

*/

enum RoomType {Standard, Deluxe, Suite};

class HotelBooking {
  guestName: string;
  roomType:RoomType;
  nights:number;
  totalPrice: number;

  constructor(guestName:string, roomType:RoomType, nights:number){
    this.guestName = guestName;
    this.roomType = roomType;
    this.nights = nights;
    let price:number = 0;

    if(roomType === RoomType.Standard){
      price = 1000;
    }else if(roomType === RoomType.Deluxe){
      price = 2000;
    }else if(roomType === RoomType.Suite){
      price = 3000;
    }

    this.totalPrice = nights * price;
  }

  printSummary(): string {
    return `Booking for ${this.guestName} | Room: ${RoomType[this.roomType]} | Nights: ${this.nights} | Total: ${this.totalPrice} THB`
  }
}

const booking1 = new HotelBooking("Anna", RoomType.Deluxe, 2);

console.log(booking1);