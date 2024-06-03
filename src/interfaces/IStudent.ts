import IDob from "./IDob";
import ILocation from "./ILocation";
import IName from "./IName";
import IPicture from "./IPicture";

export default interface IStudent {
    gender: string,
    name: IName,
    location: ILocation,
    email: string,
    dob: IDob,
    phone: string,
    login: ILogin,
    picture: IPicture,
    nat: string,
    uid: number
}

export function getFormattedStudentName(student: IStudent): string {
    return `${student.name.first} ${student.name.last}`
}

export function getFormattedStudentGender(student: IStudent): string {
    switch(student.gender) {
        case "male": return "Masculino";
        case "female": return "Feminino"
        default: return student.gender.charAt(0).toUpperCase() + student.gender.slice(1)
    } 
}

export function getFormattedStudentDOB(student: IStudent, withAge: Boolean = false): string {
    const dateSplit = student.dob.date.split("-")
    const year = dateSplit[0]
    const month = dateSplit[1]
    const daySplit = dateSplit[2].split("T")
    const day = daySplit[0]
    let baseDate = `${day}/${month}/${year}`
    if (withAge) {
        baseDate += ` (${student.dob.age} anos)`
    }
    return baseDate
}

export function getFormattedStudentAddress(student: IStudent): string {
    return `${student.location.street.name}, ${student.location.street.number}\n${student.location.city}, ${student.location.state} - ${student.location.country}`
}

export function filterByName(student: IStudent, text: string): boolean {
    return student.name.first.startsWith(text) || student.name.last.startsWith(text)
}

