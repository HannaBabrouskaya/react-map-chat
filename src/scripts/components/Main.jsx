import React from 'react';
import Login from 'components/Login';
import MainContainer from 'components/Main_container';
import Registration from 'components/Registration';
import Profile from 'components/Profile';
import {Switch, Route} from 'react-router-dom'

const Main = (props) => (
    <Switch>
        <Route exact path='/login' render={() => <Login handleUpdateProfile={props.handleUpdateProfile}/>}/>
        <Route exact path='/registration' render={() => <Registration handleUpdateProfile={props.handleUpdateProfile}/>}/>
        <Route path='/profile' render={() => <Profile handleUpdateProfile={props.handleUpdateProfile} name={props.name}/>}/>
        <Route exact path='/' render={() => props.name?<MainContainer users={props.users} pos={props.pos}/>:<Login handleUpdateProfile={props.handleUpdateProfile}/>}/>
    </Switch>
);
export default Main;