
export interface UserInterface {
    _id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
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

