/* 
#ระบบพนักงานกับแผนก (Employee & Department)

Output:
My name is Alice. I work in the Engineering department.

*/

enum DepartmentType {
  HR,
  Engineering,
  Marketing,
}

class Department {
  name: string;
  type: DepartmentType;

  constructor(name: string, type: DepartmentType) {
    this.name = name;
    this.type = type;
  }
}

class Employee {
  name: string;
  department: Department;

  constructor(name: string, department: Department) {
    this.name = name;
    this.department = department;
  }

  introduce(): string {
    return `My name is ${this.name}. I work in the ${DepartmentType[this.department.type]} department.`;
  }
}

const dept = new Department("Dev Team", DepartmentType.Engineering);
const employee = new Employee("Alice", dept);

console.log(employee.introduce());
