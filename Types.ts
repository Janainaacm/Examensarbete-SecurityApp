
export interface UserInterface {
    _id?: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password?: string,
    phonenumber: string,
    cancelAlarmCode: number,
    customDangerMessage: string,
    selectedContacts: ContactsInterface[];
}

export interface ContactsInterface {
    _id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string
}



export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Home: undefined;
  };
  

