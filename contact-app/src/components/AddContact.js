import React from "react";
// import { useHistory } from "react-router-dom";


// class component below
class AddContact extends React.Component {
    state = {
        name: "",
        email: "",
    }
    

        add = (e) => {
        e.preventDefault(); // how this works?
        if(this.state.name === "" || this.state.email === "") {
            alert("All the fields are mandatory")
            return
        }
        this.props.addContactHandler(this.state);
        this.setState({name:"",email:""});
        this.props.history.push("/");


    }
    render() {
        return (
            <div className="ui main">
             
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input 
                        type="text" 
                        name="name" 
                        placeholder="enter name" 
                        value = {this.state.name} // the displayed value field
                        onChange={(e) => this.setState( {name: e.target.value}) }/>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input 
                        type="text" 
                        name="email" 
                        placeholder="enter emailId"
                        value = {this.state.email} //
                        onChange={(e) => this.setState({email: e.target.value})}
                        />
                    </div>
                   
                    <button className="ui button blue">Add</button>
                  

                </form>
            </div>

        );
    }
}

export default AddContact;