import { useState, useEffect } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  const addContact = contact => {
    setContacts([contact, ...contacts]);
  };

  const checkSameName = name => {
    const sameName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (sameName) {
      alert(`${name} is already in contacts`);
      return;
    }
    return !sameName;
  };
  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filterContact = e => {
    setFilter(e.currentTarget.value);
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filtredContacts = getFiltredContacts();
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} onCheck={checkSameName} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterContact} />

      <ContactList contacts={filtredContacts} onDeleteContact={deleteContact} />
    </>
  );
};
