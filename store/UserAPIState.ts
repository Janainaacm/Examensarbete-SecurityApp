import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { ContactsInterface, RootStackParamList, UserInterface } from "@/Types";
import { Session } from '@supabase/supabase-js'
import { StackNavigationProp } from "@react-navigation/stack";



interface UserAPIState {
  currentUser: UserInterface;
  contactsList: ContactsInterface[];
  setUserIdState: () => void;
  fetchUserById: (userId: string) => void;
  signUpNewUser: (newUser: UserInterface, setErrorMessage: React.Dispatch<React.SetStateAction<string>>) => Promise<void>;
  signInUser: (email: string, password: string, navigation: StackNavigationProp<RootStackParamList>, setErrorMessage: React.Dispatch<React.SetStateAction<string>>) => Promise<void>;
  updateUserInformation: (newUserInformation: UserInterface) => Promise<void>;
  signOutSession: () => Promise<void>;
  fetchUserContactList: () => Promise<void>;
  addToContactsList: (contact: ContactsInterface) => void;
  removeFromContactsList: (contactIdToRemove: number) => void;
  clearContactsList: () => void;
  removeAllFromContactsList: () => void;
}

export const useUserAPIState = create<UserAPIState>((set, get) => ({
  currentUser: {} as UserInterface,
  contactsList: [],
  
  setUserIdState: async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
  
      if (session && session.user) {
        set((state) => ({
          ...state,
          currentUser: { ...state.currentUser, id: session.user.id },
        }));
      }
    } catch (error) {
      console.error("Error getting session:", error);
    }
  },
  

  fetchUserById: async (userId: string) => {

    try {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId);

      if (error) throw error;
      if (users && users.length > 0) {
        set({ currentUser: users[0] });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },

  signUpNewUser: async (
    newUser: UserInterface, 
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .insert([newUser])
        .select();
  
      if (error) {
        setErrorMessage(error.message);
        throw error; 
      }
  
      if (data) {
        set({ currentUser: data[0] });
      }
    } catch (error) {
      console.error("Error signing up user:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  },
  

  signInUser: async (
    email: string, 
    password: string,   
    navigation: StackNavigationProp<RootStackParamList>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
    ) => {

    console.log("inside method")
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("after api call")

  
      if (error) setErrorMessage(error.message);

      console.log("after throw error")

  
      const { user } = data;
      if (user) {
        console.log("show if user")

        try {
          const { data: users, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id);
  
          if (fetchError) setErrorMessage(fetchError.message);
          if (users && users.length > 0) {
            set({ currentUser: users[0] });
            console.log("User supposedly saved: ", user)
            navigation.navigate("Home");

          }
        } catch (fetchError) {
          console.error("Error fetching user:", fetchError);
        }
      }
    } catch (signInError) {
      console.error("Error signing in user:", signInError);
    }
  },
  

  signOutSession: async () => {
    try {
      await supabase.auth.signOut();
      set({ currentUser: {} as UserInterface, contactsList: [] });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },

  fetchUserContactList: async () => {
    const { currentUser } = get();
    if (!currentUser._id) return;

    try {
      const { data: contacts, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("userId", currentUser._id);

      if (error) throw error;
      set({ contactsList: contacts || [] });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  },

  addToContactsList: async (contact: ContactsInterface) => {
    const { currentUser } = get();
    if (!currentUser._id) return;

    try {
      const { data, error } = await supabase
        .from("contacts")
        .insert([{ ...contact, userId: currentUser._id }])
        .select();

      if (error) throw error;
      set((state) => ({
        contactsList: [...state.contactsList, ...data],
      }));
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  },

  removeFromContactsList: async (contactIdToRemove: number) => {
    const { currentUser } = get();
    if (!currentUser._id) return;

    try {
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", contactIdToRemove)
        .eq("userId", currentUser._id);

      if (error) throw error;
      set((state) => ({
        contactsList: state.contactsList.filter(
          (contact) => contact._id !== contactIdToRemove
        ),
      }));
    } catch (error) {
      console.error("Error removing contact:", error);
    }
  },

  clearContactsList: () => set({ contactsList: [] }),

  removeAllFromContactsList: async () => {
    const { currentUser } = get();
    if (!currentUser._id) return;

    try {
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("userId", currentUser._id);

      if (error) throw error;
      set({ contactsList: [] });
    } catch (error) {
      console.error("Error removing all contacts:", error);
    }
  },

  updateUserInformation: async (newUserInformation: UserInterface) => {
    const { currentUser } = get();
    if (!currentUser._id) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .update(newUserInformation)
        .eq("id", currentUser._id)
        .select();

      if (error) throw error;
      if (data) {
        set({ currentUser: { ...currentUser, ...newUserInformation } });
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  },
}));
