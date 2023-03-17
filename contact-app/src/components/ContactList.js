import { render } from "@testing-library/react";
import React, {useRef} from "react";
import {Link} from 'react-router-dom';
import ContactCard from "./ContactCard";


const ContactList = (props) => {
    console.log(props)
    const inputEle = useRef("");
   

    const renderContactList = props.contacts.map((contact) => {
        return (
            // <ContactCard key = {contact.id} contact={contact} clickHandler = {deleteContactHandler} />
            <ContactCard key = {contact.id} contact={contact}/>
        );

    });
   
    const getSearchTerm = () => {
        console.log(inputEle)
        props.searchKeyword(inputEle.current.value);
    };

    return (
        <div className="main">
            <h2>
            Contact List
            
            <Link to="/add">
            <button className="ui button blue right">Add Contact</button>
            </Link> </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input 
                    ref = {inputEle}
                    type="text" 
                    placeholder="search contact" 
                    className="prompt" 
                    value = {props.term} 
                    onChange = {getSearchTerm} />

                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">{renderContactList.length>0 ? renderContactList : "No contacts available" }</div>
       
        </div>
    );
    
};
export default ContactList;