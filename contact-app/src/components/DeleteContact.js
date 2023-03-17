import React from 'react';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom';

const DeleteContact = (props) => {
    const history = useHistory();
    const {id,name,email} = props.location.state.contact
    
    // console.log(props.removeContactHandler)
    //   const deleteContactHandler = (id) => {
    //     props.getContactId(id)
    // }
    
    const remove = (id)=>
    {
    props.removeContactHandler(id)    
    }
    return (
        
        <div className="main">
            <p>Are you sure, you want to delete this contact?</p>
            <button onClick={()=>{remove(id)
            history.push('/')}}>Yes</button> 
            <Link to="/">
            <button>No</button>
            </Link>
        </div>
      );
}
 
export default DeleteContact;