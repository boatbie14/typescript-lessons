/* 

#ระบบการจองตั๋วเครื่องบิน (Flight Booking System)

สร้างระบบจำลองการจองตั๋วโดยผู้โดยสาร โดยมีข้อมูลไฟลต์ + ที่นั่ง + ประเภทผู้โดยสาร

Output :
Sarah (Adult) is booked on flight TG102 to Tokyo.

*/

enum PassengerType {
  Adult,
  Child,
  Senior,
}

class Flight {
  code: string;
  destination: string;

  constructor(code: string, destinatoin: string) {
    this.code = code;
    this.destination = destinatoin;
  }
}

class Booking {
  name: string;
  passengerType: PassengerType;
  flight: Flight;

  constructor(name: string, passengerType: PassengerType, flight: Flight) {
    this.name = name;
    this.passengerType = passengerType;
    this.flight = flight;
  }

  getSummary(): string {
    return `${this.name} (${PassengerType[this.passengerType]}) is booked on flight ${this.flight.code} to ${this.flight.destination}.`;
  }
}

const flight1 = new Flight("TG102", "Tokyo");
const booking = new Booking("Sarah", PassengerType.Adult, flight1);

console.log(booking.getSummary());
