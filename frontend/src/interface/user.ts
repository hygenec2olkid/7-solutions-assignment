interface Address {
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  country: string;
  postalCode: string;
  state: string;
  stateCode: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

interface Hair {
  color: string;
  type: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  gender: string;
  age: number;
  email: string;
  username: string;
  password: string;
  birthDate: string;
  eyeColor: string;
  hair: Hair;
  height: number;
  weight: number;
  address: Address;
  bank: Bank;
  company: Company;
  crypto: Crypto;
  ein: string;
  ssn: string;
  university: string;
  role: string;
  phone: string;
  image: string;
  ip: string;
  macAddress: string;
  userAgent: string;
  bloodGroup: string;
}
