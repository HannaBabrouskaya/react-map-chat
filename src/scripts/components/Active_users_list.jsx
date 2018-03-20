import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';


const ActiveUsersList = (props) => (
    <List>
        <Subheader>Online Users</Subheader>
        {props.users.map((item) =>
            <ListItem
                disabled={true}
                key={item.email}
                primaryText={item.username}
            />
        )}
        {/* <ListItem
            primaryText="Brendan Lim"
            leftAvatar={<Avatar src="images/ok-128.jpg" />}
            rightIcon={<CommunicationChatBubble />}
        />*/}
    </List>
);

export default ActiveUsersList;