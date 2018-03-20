import React, {Component} from 'react';
import MessageList from './MessageList';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class ChatBox extends Component {
    constructor(props){
        super(props);
        this.state={
            messages:[],
            curMessage:"",
            owner:""
        }
        this.appendChatMessage = this.appendChatMessage.bind( this );
        this.clearMessages = this.clearMessages.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

   appendChatMessage(e) {
        e.preventDefault();
        this.setState({curMessage:e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let newMessage = {
            id: Math.floor((Math.random() * 100) + 1),
            timestamp: new Date().getTime(),
            text: this.state.curMessage,
            owner: firebase.auth().currentUser.displayName
        };
        let dataRef = firebase.database().ref("messages/");
        dataRef.push(newMessage);
        this.setState({curMessage:''});
    }    

    clearMessages() {
        // firebase.database().ref("messages/").remove();
        this.setState( { messages: [] } );
    }
    
    componentDidMount() {
        let dataRef = firebase.database().ref("messages/");
        dataRef.on('value', (snapshot) => {
            let msg = [];
            snapshot.forEach((item)=> {
                msg.push(item.val());
            });
            this.setState({messages: msg});
        });
    }

    render() {
        return (
            <div>
                <MessageList messages={this.state.messages}/>
                <form style={{marginTop: 20}} onSubmit={this.handleSubmit}>
                    <TextField 
                    style={{width:400, marginRight: 20}}
                    value={this.state.curMessage}
                    onChange={this.appendChatMessage}
                    type="text"
                    hintText="Enter your Message"
                    name="message"
                    />
                    <RaisedButton type="submit" label="Submit"/>&nbsp;
                    <RaisedButton label="Clear chat" onClick={this.clearMessages}/>
                </form>
            </div>
        );
    }
}

export default ChatBox;