import { ContactsInterface, UserInterface } from "@/Types";
import { create } from "zustand";

interface EditSafetyState {
    //userToEdit: UserInterface;
    contactsList: ContactsInterface[];

    addToContactsList: (contact: ContactsInterface) => void;
    removeFromContactsList: (contactIdToRemove: number) => void;
    clearContactsList: () => void;
    removeAllFromContactsList: (contactIdToRemove: number) => void;

}

export const useEditSafetyState = create<EditSafetyState>((set) => ({
    contactsList: [], 


    addToContactsList: (contact) => {
        set((state) => ({
            contactsList: [...state.contactsList, contact],
          }));
    },

    removeFromContactsList: (contactIdToRemove) => {
        set((state) => {
          const indexToRemove = state.contactsList.findIndex(
            (contact) => contact._id === contactIdToRemove
          );
          if (indexToRemove !== -1) {
            const updatedContactList = [...state.contactsList];
            updatedContactList.splice(indexToRemove, 1);
            return { contactsList: updatedContactList };
          }
          return state;
        });
      },

      removeAllFromContactsList: (contactIdToRemove) => {
        set((state) => ({
          contactsList: state.contactsList.filter(
            (contact) => contact._id !== contactIdToRemove
          ),
        }));
      },

      clearContactsList: () => {
        set(() => ({
          contactsList: [],
        }));
      },
    
}));
