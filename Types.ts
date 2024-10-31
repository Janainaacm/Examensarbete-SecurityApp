
export interface UserInterface {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    selectedContacts: ContactsInterface[];
}

export interface ContactsInterface {
    firstName: string,
    lastName: string,
    phoneNumber: string
}

