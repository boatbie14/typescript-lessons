/* 
#ระบบจัดการหลักสูตรอบรม (Training Course System)

สร้างระบบจัดการการลงทะเบียนหลักสูตรของผู้เรียน โดยใช้ enum แยกประเภทหลักสูตร และ class ซ้อนกันระหว่าง Course, Trainee, Enrollment

Output:
Enrollment Summary for Ben:
- Courses: 2
- Total: 6500 THB

Courses in category: Programming
["TypeScript Bootcamp"]

*/

enum CourseCategories {
  Programming,
  Design,
  Marketing,
  Other,
}

class Course {
  name: string;
  price: number;
  courseCategory: CourseCategories;

  constructor(name: string, price: number, courseCategory: CourseCategories) {
    this.name = name;
    this.price = price;
    this.courseCategory = courseCategory;
  }
}

class Trainee {
  clientName: string;

  constructor(clientName: string) {
    this.clientName = clientName;
  }
}

class Enrollment {
  client: Trainee;
  items: Course[] = [];

  constructor(client: Trainee) {
    this.client = client;
  }

  addItem(course: Course): void {
    this.items.push(course);
  }

  summary(): string {
    const totalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
    return `Enrollment Summary for ${this.client.clientName}:\n - Courses: ${this.items.length}\n- Total: ${totalPrice} THB`;
  }

  listCourseByCategory(courseCategory: CourseCategories): string[] {
    const coursesInCategory = this.items.filter((item) => item.courseCategory === courseCategory).map((item) => item.name);
    return coursesInCategory;
  }
}

const course1 = new Course("Next.js", 2500, CourseCategories.Programming);
const course2 = new Course("Node.js", 1500, CourseCategories.Programming);
const course3 = new Course("Photoshop", 3500, CourseCategories.Design);

const trainee = new Trainee("Boat");
const enrollment = new Enrollment(trainee);

enrollment.addItem(course1);
enrollment.addItem(course2);
enrollment.addItem(course3);

console.log(enrollment.summary());
console.log("Courses in category: Programming");
console.log(enrollment.listCourseByCategory(CourseCategories.Programming));
