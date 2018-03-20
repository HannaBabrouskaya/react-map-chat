import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia} from 'material-ui/Card';
import MapGoogle from 'components/Map';
import ActiveUsersList from 'components/active_users_list';
import ChatBox from 'components/ChatBox';

const MainContainer = (props) => (
    <MuiThemeProvider>
        <Card className="card">
            <CardMedia style={style}>
                <MapGoogle pos={props.pos} users={props.users}/>
            </CardMedia>
            <CardActions style={styleChat}>
                <ChatBox />
            </CardActions>
            <CardMedia style={styleMedia}>
                <ActiveUsersList users={props.users}/>
            </CardMedia>
        </Card>
    </MuiThemeProvider>
);

const style = {
    width: window.innerWidth,
    height: 400
};

const styleMedia = {
    display: "flex",
    width: 400,
    height: 400
};

const styleChat = {
    display: "flex"
};

export default MainContainer;