/*
ใช้ class 2 ตัว (Owner และ Pet) เพื่อสร้าง object ที่เชื่อมกัน และให้ console.log() แสดงข้อความแนะนำสัตว์เลี้ยง

Output

My name is Bob. This is my pet Max the Dog. Max says: Woof!


*/

enum SpecieCategories {
  Dog,
  Cat,
}

class Pet {
  name: string;
  specie: SpecieCategories;
  speak: string;

  constructor(name: string, specie: SpecieCategories) {
    this.name = name;
    this.specie = specie;

    if (specie === SpecieCategories.Dog) {
      this.speak = "Woof!";
    } else if (specie === SpecieCategories.Cat) {
      this.speak = "Meow!";
    } else {
      this.speak = "...";
    }
  }
}

class Owner {
  name: string;
  pet: Pet;

  constructor(name: string, pet: Pet) {
    this.name = name;
    this.pet = pet;
  }

  introducePet(): string {
    return `My name is ${this.name}. This is my pet ${this.pet.name} the ${SpecieCategories[this.pet.specie]}. ${this.pet.name} says: ${
      this.pet.speak
    }`;
  }
}

const myPet = new Pet("JoJo", SpecieCategories.Cat);
const owner = new Owner("Boat", myPet);

console.log(owner.introducePet());
