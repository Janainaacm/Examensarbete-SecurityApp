import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import * as Contacts from "expo-contacts";

export default function ContactsAccess() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [contactList, setContactList] = useState<Contacts.Contact[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        setPermissionGranted(true);
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
          console.log(contacts); // Store fetched contacts
        } else {
          Alert.alert("No contacts found on this device.");
        }
      } else {
        Alert.alert("Permission to access contacts was denied.");
      }
    })();
  }, []);

  //Does not work
  const toggleContactSelection = (contact: Contacts.Contact) => {
    console.log(contact.name);
    setContactList((prevList) => {
      if (prevList.some((c) => c.name === contact.name)) {
        return prevList.filter((c) => c.name !== contact.name); // Deselect contact
      } else {
        return [...prevList, contact]; // Select contact
      }
    });
    console.log(contactList.map((contact, i) => contact.name))
  };

  const addContactsToDatabase = () => {
    //add the contacts to database
  }

  return (
    <View>
      <Text>Contacts</Text>

      {permissionGranted ? (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id?.toString() || item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleContactSelection(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Contacts access not granted</Text>
      )}
      <View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Selected Contacts", JSON.stringify(contactList, null, 2));
          }}
        >
          <Text>Save Selected Contacts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
