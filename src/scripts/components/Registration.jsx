import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Redirect, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';


class Registration extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            confirmPassword:'',
            validated:false,
            error:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.username.length&&this.state.password.length>3) {
            if(this.state.password !== this.state.confirmPassword) {
                this.setState({error:"Password values don't match"});
                return;
            }
        
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
                user.updateProfile({
                    displayName: this.state.username
                }).then(() => {
                    // Update successful
                    let usersData = firebase.database().ref("users/");
                    usersData.push({
                        username: this.state.username,
                        email: this.state.email,
                        online:true
                    });
                    this.setState({error:''});
                    this.props.handleUpdateProfile(this.state.username);
                    this.setState({validated:true});
                }, function(error) {
                    // An error happened
                });        
            }, (error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                errorMessage = 'The password is too weak.';
                }
                this.setState({error:errorMessage});
            });

        }
    }

    handleChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        if (this.state.validated) {
            return <Redirect to='/'/>;
        }
        return (
            <div className="main-login-form">
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            style={{textAlign:"center"}}
                            iconElementLeft={<IconButton style={{display:"none"}} name="signup title"></IconButton>}
                            title="Registration"
                        />
                        <form style={{marginBottom: 15, textAlign:"center"}} onSubmit={this.handleSubmit}>
                            <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                            required
                            errorText={`${this.state.username.length||!this.state.validated?"":"This field is required"}`}
                            />
                            <br/>
                            <TextField
                            name="email"
                            type="email"
                            hintText="Enter your email"
                            floatingLabelText="Email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            required
                            errorText={`${this.state.email.length||!this.state.validated?"":"This field is required"}`}
                            />
                            <br/>
                            <TextField
                                type="password"
                                name="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                required
                                errorText={`${this.state.password.length||!this.state.validated?"":"This field is required"}`}
                                />
                            <br/>
                            <TextField
                                type="password"
                                name="confirmPassword"
                                hintText="Confirm your Password"
                                floatingLabelText="Confirm Password"
                                onChange={this.handleChange}
                                value={this.state.confirmPassword}
                                required
                                errorText={`${this.state.password.length||!this.state.validated?"":"This field is required"}`}
                                />
                            <br/>
                            <RaisedButton 
                            label="Submit" 
                            primary={true} 
                            style={style}
                            type="submit"
                            />
                        </form>
                        <span className="error">{this.state.error?this.state.error:""}</span><br></br>
                        <span>Already registrated? <Link to='/login'><FlatButton name="login" label="Click to login" /></Link></span>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: "auto",
    display: "block",
    width:100,
    marginTop:15
};

export default Registration;