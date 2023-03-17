import React from 'react';
import {Link} from 'react-router-dom';
import user from '../images/user.png';
// import DeleteContact from './DeleteContact';

const ContactCard = (props) => {

    const {id,name,email} = props.contact;

    return (
        <div className="item">
            <img className='ui avatar image' src={user} alt="user" />
        <div className="content">
            <Link to=
            {{ pathname:`/contact/${id}`, state: { contact: props.contact }}}>
            <div className="header"> {name}</div>
            <div>{email}</div>
            </Link>
        </div>
        <Link to=
        {{ pathname:`/delete`, state: {contact: props.contact }}}>
        <i 
        className="trash alternate outline icon" 
        style = {{color:"red",marginTop:"7px",marginLeft:"10px"}} 
        // onClick = {() => props.clickHandler(id) }
        ></i>
        </Link>
        <Link to=
            {{ pathname:`/edit/${id}`, state: { contact: props.contact }}}>
        <i 
        className="edit alternate outline icon" 
        style = {{color:"green",marginTop:"7px"}} 
        // onClick = {() => props.clickHandler(id) }
        ></i>
        </Link>
    </div>
      );
}
 
export default ContactCard;