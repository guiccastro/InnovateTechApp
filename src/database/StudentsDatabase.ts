import IStudent from '@/src/interfaces/IStudent'
import * as SQLite from 'expo-sqlite'

export interface IStudentDatabase {
  uid: number;
  gender: string;
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  city: string;
  state: string;
  country: string;
  email: string;
  dobDate: string;
  dobAge: string;
  phone: string;
  uuid: string;
  pictureLarge: string;
  pictureMedium: string;
  pictureThumbnail: string;
  nat: string
}

const db = await SQLite.openDatabaseAsync('studentsDB')