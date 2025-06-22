/*

#ระบบคลาสเรียนกับนักเรียน

Output:

John is enrolled in: Math, Science

*/

enum SubjectCategory {
  Math,
  Science,
  Art,
}

class Subject {
  name: string;
  category: SubjectCategory;

  constructor(name: string, category: SubjectCategory) {
    this.name = name;
    this.category = category;
  }
}

class Student {
  name: string;
  subjects: Subject[] = [];

  constructor(name: string) {
    this.name = name;
  }

  enroll(subject: Subject): void {
    this.subjects.push(subject);
  }

  listSubjects(): string {
    const subjectNames = this.subjects.map((subject) => SubjectCategory[subject.category]);
    return `${this.name} is enrolled in: ${subjectNames}`;
  }
}

const math = new Subject("Algebra", SubjectCategory.Math);
const art = new Subject("Painting", SubjectCategory.Art);

const student = new Student("John");
student.enroll(math);
student.enroll(art);

console.log(student.listSubjects());
