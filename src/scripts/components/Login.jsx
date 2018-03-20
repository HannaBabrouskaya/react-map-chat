import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Redirect, Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            error:'',
            validated:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.email.length&&this.state.password.length) {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
                this.setState({error:''}); 
                this.props.handleUpdateProfile(user.displayName);
                this.setState({validated: true});
                return;
            }, (error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({error:errorMessage});
            });
        }
    }

    onTextChange(e) {
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
                        iconElementLeft={<IconButton style={{display:"none"}} name="login title"></IconButton>}
                        title="Login"
                        />
                        <form style={{marginBottom:15, textAlign:"center"}} onSubmit={this.handleSubmit}>
                            <TextField
                                name="email"
                                type="email"
                                hintText="Enter your email"
                                floatingLabelText="Email"
                                onChange={(e) => this.onTextChange(e)}
                                value={this.state.email}
                                required
                                errorText={`${this.state.email.length||!this.state.validated?"":"This field is required"}`}
                                />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                name="password"
                                onChange={(e) => this.onTextChange(e)}
                                value={this.state.password}
                                required
                                errorText={`${this.state.password.length||!this.state.validated?"":"This field is required"}`}
                            />
                            <br/>
                            <RaisedButton 
                                label="Submit" 
                                primary={true}
                                name="login"
                                className="login-button"
                                type="submit"
                            />
                        </form>
                        <span className="error">{this.state.error?this.state.error:""}</span><br></br>
                        <span>Not registred yet? <Link to='/registration'><FlatButton name="sign up" label="Click to register" /></Link></span>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;