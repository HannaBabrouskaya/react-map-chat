import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import EditIcon from 'material-ui/svg-icons/editor/border-color';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.state = {
            contenteditable:{
                username: false,
                email: false
            },
            open:false,
            email:"",
            username: "",
            password: "",
            oldpassword:"",
            photo:""//put current photo
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleEdit(name, e) {
        e.preventDefault();
        this.setState({contenteditable:{[name]:true}});
    }

    componentWillMount(){
        let dataRef = firebase.database().ref("users/");
        dataRef.once('value', (snapshot) => {
            this.setState({email:firebase.auth().currentUser.email, username:firebase.auth().currentUser.displayName});
        });
    }

    handleOpen() {
        this.setState({open: true});
    };
    
    handleClose() {
        this.setState({open: false});
    };

    onChangePhoto(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () =>{  
            this.setState({photo:reader.result});
        }
        if(file){
            reader.readAsDataURL(file);
        } else {
        }
    }

    onTextChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit(e) {
        this.setState({contenteditable:{username:false, email:false}});
        let dataRef = firebase.database().ref("users/");
        dataRef.once('value', (snapshot) => {
            let user = firebase.auth().currentUser;
            snapshot.forEach((item) => {
                let userData = firebase.database().ref(`users/${item.key}`);
                if(user && user.email === item.val().email) {
                    let changed = false;
                    if(this.state.password){
                        const credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.oldpassword)
                        user.reauthenticateWithCredential(credential).then(() => {
                            user.updatePassword(this.state.password);
                        }).catch(function(error) {
                        // An error happened.
                        });
                        changed = true;
                    } else if(this.state.email&&this.state.email!==user.email) {
                        userData.update ({email: this.state.email});
                        user.updateProfile ({email: this.state.email});
                        changed = true;
                    } else if(this.state.username&&this.state.username!==user.displayName) {
                        userData.update ({username: this.state.username});
                        user.updateProfile ({displayName: this.state.username});
                        changed = true;
                    }
                    if(changed) {
                        this.props.handleUpdateProfile(this.state.username);
                        this.handleOpen();
                    }
                }
            })
            
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        return (
            <MuiThemeProvider>
                <div>
                    <List style={style}>
                        <Subheader>General</Subheader>
                        {/* <ListItem
                        // disabled={true}
                        secondaryText="Profile photo"
                        primaryText={<input onChange={(e) => this.onChangePhoto(e)} type='file' />}
                        leftAvatar={
                        <Avatar src={this.state.photo}/>
                        }>
                        </ListItem> */}
                        <ListItem
                            disabled={true}
                            primaryText={this.state.contenteditable.username?<TextField 
                                type="username"
                                name="username"
                                hintText="Enter new username"
                                floatingLabelText="Enter new username"
                                value={this.state.username}
                                onChange={(e) => this.onTextChange(e)}
                                />:this.state.username}
                            secondaryText="Username"
                            rightIcon={<EditIcon onClick={(e)=>this.handleEdit("username", e)}/>}
                        />
                        <ListItem
                            disabled={true}
                            primaryText={this.state.contenteditable.email?<TextField 
                                type="email"
                                name="email"
                                hintText="Enter new email"
                                floatingLabelText="Enter new email"
                                value={this.state.email}
                                onChange={(e) => this.onTextChange(e)}
                                />:this.state.email}
                            secondaryText="Email"
                            rightIcon={<EditIcon onClick={(e)=>this.handleEdit("email", e)}/>}
                        />
                        <ListItem
                            disabled={true}
                            primaryText={<TextField 
                                type="password"
                                name="oldpassword"
                                hintText="Enter old password"
                                floatingLabelText="Enter old password"
                                value={this.state.oldpassword}
                                onChange={(e) => this.onTextChange(e)}
                                />}
                            secondaryText="Old password"
                        />
                        <ListItem
                            disabled={true}
                            primaryText={<TextField 
                                type="password"
                                name="password"
                                hintText="Enter new password"
                                floatingLabelText="Enter new password"
                                value={this.state.password}
                                onChange={(e) => this.onTextChange(e)}
                                />}
                            secondaryText="Password"
                        />
                        <ListItem
                        disabled={true}
                        primaryText={<RaisedButton 
                            label="Save"
                            name="save"
                            primary={true}
                            type="submit"
                            onClick={this.handleSubmit}
                            />}
                        />
                    </List>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        Profile changes saved
                    </Dialog>
                </div>
            </MuiThemeProvider>
        )
    }
}

const style = {
    width:400
};
export default Profile;