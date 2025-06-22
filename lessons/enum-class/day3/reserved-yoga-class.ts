/* 
# โจทย์: ระบบจองคลาสแบบ Real-world พร้อม JSON Response (ระดับ 7.5/10)

ระบบจองคลาสสำหรับฟิตเนสที่สามารถส่งออกข้อมูลในรูปแบบ JSON สำหรับใช้งานในระบบจริง เช่น REST API หรือ Mobile App

## โจทย์ย่อย:

1. รับผู้ใช้ (User) ที่ต้องการจองคลาสฟิตเนส (เช่น Yoga, HIIT, Spin)
2. แต่ละคลาสมี:
   - ชื่อ
   - ประเภท (enum: Yoga, HIIT, Spin)
   - ราคา
   - เวลาเริ่ม (startTime) และสิ้นสุด (endTime)
   - จำนวนที่นั่งทั้งหมด
   - จำนวนที่นั่งที่ถูกจองแล้ว
3. เช็กว่า:
   - คลาสที่ต้องการจองยังว่างหรือไม่
   - เวลาไม่ชนกับคลาสที่ผู้ใช้จองไปแล้ว
4. ถ้าจองสำเร็จ ให้เพิ่มจำนวนที่นั่งที่ถูกจอง
5. แสดงผลลัพธ์เป็น JSON โดยมี format แบบนี้:

```json
{
  "user": "Boat",
  "bookedClasses": [
    {
      "name": "Morning Flow",
      "type": "Yoga",
      "price": 900,
      "startTime": "2025-06-21T08:00:00",
      "endTime": "2025-06-21T09:00:00"
    }
  ],
  "total": 900
}

| Class Name      | Type  | Price (THB) | Start Time           | End Time             | Max Participants | Current Participants |
|----------------|-------|-------------|----------------------|----------------------|------------------|-----------------------|
| Morning Flow   | Yoga  | 900         | 2025-06-21T08:00:00  | 2025-06-21T09:00:00  | 15               | 13                    |
| HIIT Power     | HIIT  | 1200        | 2025-06-21T08:30:00  | 2025-06-21T09:30:00  | 10               | 10                     |
| Spin Class     | Spin  | 1000        | 2025-06-21T09:00:00  | 2025-06-21T10:00:00  | 12               | 11                    |

*/

enum ClassType {
  Yoga,
  HIIT,
  Spin,
}

const classDetail = [
  {
    name: "Morning Flow",
    type: "Yoga",
    price: 900,
    startTime: "2025-06-21T08:00:00",
    endTime: "2025-06-21T09:00:00",
    maxParticipants: 15,
    currentParticipants: 13,
  },
  {
    name: "HIIT Power",
    type: "HIIT",
    price: 1200,
    startTime: "2025-06-21T08:30:00",
    endTime: "2025-06-21T09:30:00",
    maxParticipants: 10,
    currentParticipants: 10,
  },
  {
    name: "Spin Class",
    type: "Spin",
    price: 1000,
    startTime: "2025-06-21T09:00:00",
    endTime: "2025-06-21T10:00:00",
    maxParticipants: 12,
    currentParticipants: 11,
  },
];

class FitnessClass {
  name: string;
  type: ClassType;
  price: number;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;

  constructor(detail: any) {
    this.name = detail.name;
    this.type = ClassType[detail.type as keyof typeof ClassType];
    this.price = detail.price;
    this.startTime = detail.startTime;
    this.endTime = detail.endTime;
    this.maxParticipants = detail.maxParticipants;
    this.currentParticipants = detail.currentParticipants;
  }
}

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class BookingSystem {
  user: User;
  items: FitnessClass[] = [];

  constructor(user: User) {
    this.user = user;
  }

  addClass(booking: FitnessClass): void {
    if (booking.currentParticipants < booking.maxParticipants) {
      const hasTimeConflict = this.items.some((item) => {
        return booking.startTime < item.endTime && booking.endTime > item.startTime;
      });

      if (!hasTimeConflict) {
        booking.currentParticipants += 1;
        this.items.push(booking);
      } else {
        console.log(`❌ Has time conflict`);
      }
    } else {
      console.log(`❌ ${booking.name} is full`);
    }
  }

  summaryClass(): object {
    return {
      user: this.user.name,
      bookedClasses: this.items.map((item) => ({
        name: item.name,
        type: ClassType[item.type],
        price: item.price,
        startTime: item.startTime,
        endTime: item.endTime,
      })),
      total: this.items.reduce((sum, item) => sum + item.price, 0),
    };
  }
}

const booking1 = new FitnessClass(classDetail[0]);
const booking2 = new FitnessClass(classDetail[1]);
const booking3 = new FitnessClass(classDetail[2]);
const booking4 = new FitnessClass(classDetail[2]);

const client = new User("Boat");

const bookingClass = new BookingSystem(client);

bookingClass.addClass(booking1);
bookingClass.addClass(booking2);
bookingClass.addClass(booking3);
bookingClass.addClass(booking4);

console.log(JSON.stringify(bookingClass.summaryClass(), null, 2)); //JSON.stringify(value, replacer, space)

/*

ตัวอย่างการใช้ replacer:

const replacer = (key, value) => {
  if (key === 'price') return undefined;
  return value;
};

console.log(JSON.stringify(bookingClass.summaryClass(), replacer, 2));

Output = 

{
  "user": "Boat",
  "bookedClasses": [
    {
      "name": "Morning Flow",
      "type": "Yoga",
      "startTime": "2025-06-21T08:00:00",
      "endTime": "2025-06-21T09:00:00"
    }
  ],
  "total": 900
}

https://claude.ai/chat/ee9068ba-ea2e-47c6-b7c5-9ace2bc685cd

space - การจัดรูปแบบ (formatting)
2  // ← indent ด้วย 2 spaces ทำให้อ่านง่าย

*/
