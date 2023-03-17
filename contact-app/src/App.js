import React, {useState, useEffect}  from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import uuid from 'react-uuid';
import api from './api/contacts';
import './components/App.css';
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetail from './components/ContactDetail';
import DeleteContact from './components/DeleteContact';
import EditContact from './components/EditContact';


function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts,setContacts] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [searchResults,setSearchResults] = useState([]);

  //retrieve contacts
  const retrieveContacts = async() => {
    const response = await api.get("/contacts");
    return response.data;
  };


  const addContactHandler = async(contact) => {
    const request = {
      id:uuid(),
      ...contact,
    };
    const response = await api.post("/contacts",request)
    setContacts([...contacts,response.data]);
  };

  const updateContactHandler = async(contact) => {
    const response = await api.put(`/contacts/${contact.id}`,contact);
    const {id,name,email} = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data} : contact;
      })
    )};
 

  const removeContactHandler = async(id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList  = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);  
  };
   
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }else {
      setSearchResults(contacts);
    }

  }

// always gets displayed in the front page
  useEffect(() => {
  //   const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if(retrieveContacts){ setContacts(retrieveContacts);} 
  const getAllContacts = async() => {
    const allContacts = await retrieveContacts();
    if(allContacts) setContacts(allContacts);
  };
  getAllContacts();
}, []);

// storage every time add contact occurs
  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]);
 
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route path = "/" exact 
          render = {(props) => (
          <ContactList 
          {...props} 
          contacts = {searchTerm < 1 ? contacts: searchResults} 
          term = {searchTerm}
          searchKeyword = {searchHandler}
           /> )}
          />

          <Route path="/add" 
           render = {(props) => (
            <AddContact 
            {...props} 
            addContactHandler = {addContactHandler} /> )}
            />

          <Route path="/edit/:id" 
           render = {(props) => (
            <EditContact 
            {...props} 
            updateContactHandler = {updateContactHandler} /> )}
            />

          <Route path="/contact/:id" component = {ContactDetail} />
        

         <Route path="/delete"
          render = {(props) => (
            <DeleteContact
            {...props}
            removeContactHandler={removeContactHandler}
           
         /> )} /> 
       

        </Switch>
       
      </Router>
       
      
    </div>
  );
}

export default App;
