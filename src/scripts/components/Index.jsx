import Main from 'components/main';
import Header from 'components/header';
import React, {Component} from 'react';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:"",
            users:[],
            pos:{}
        }
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    }

    componentWillMount() {
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    pos:{lat: position.coords.latitude, lng: position.coords.longitude}
                });
            })}  
        } catch(e) {
            return;
        }
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            let dataRef = firebase.database().ref("users/");
            if(user) {
                this.setState({ username: user.displayName });
            } else {
                this.setState({ username: '' }); 
            }
            dataRef.on('child_added', (snapshot) => {
                let usersData = firebase.database().ref(`users/${snapshot.key}`);
                if(user && user.email === snapshot.val().email) {
                    usersData.update ({
                        online: true,
                        pos: this.state.pos
                    });
                } else if(this.state.username === snapshot.val().username) {
                    usersData.update ({
                        online: false
                    });
                }
            });
            dataRef.on('value', (snapshot) => {
                let usersOnline = [];
                for(var key in snapshot.val()){
                    if(snapshot.val()[key].online) {
                        usersOnline.push(snapshot.val()[key]);
                    }
                }
                this.setState({users:usersOnline});
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleUpdateProfile(username) {
        if (username) {
            this.setState({username:username});
        } else {
            this.setState({username:''});
        }
    }
      
    render() {
        return (
            <div className="App">
                <Header name={this.state.username} />
                <Main handleUpdateProfile={this.handleUpdateProfile} pos={this.state.pos} users={this.state.users} name={this.state.username}/>
            </div>
        )
    };
}