declare module MProfile {
  interface IRecord {
    id: string,
    username: string,
    email: string,
    phonenumber: string,
    birthday: string,
    gender: string,
    city: string,
    hometown: string,
    address: string,
    avatar: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    success?: boolean,
  }
}