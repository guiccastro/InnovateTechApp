import IStreet from "./IStreet";

export default interface ILocation {
    street: IStreet,
    city: string,
    state: string,
    country: string
}