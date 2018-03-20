import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Identity from 'material-ui/svg-icons/action/perm-identity';
import {Link} from 'react-router-dom';
import ActionHome from 'material-ui/svg-icons/action/home';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {withRouter} from 'react-router'

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut() {
        this.props.history.push('/login');
        firebase.auth().signOut()
        .catch((err) => {
            new Error(err);
        });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Toolbar> 
                        <ToolbarGroup>
                            {this.props.name&&<Link to='/'><IconButton style={{marginLeft: -20}}
                                target="_blank"><ActionHome /></IconButton></Link>}
                            <ToolbarTitle text={`Welcome ${this.props.name?this.props.name:"!"}`}/>
                        </ToolbarGroup>
                        <ToolbarGroup>
                        {this.props.name&& <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText={<Link className="link" to='/profile'>Profile</Link>} />
                                <MenuItem primaryText="Sign out" onClick={this.handleSignOut}/>
                            </IconMenu>}
                        </ToolbarGroup>
                    </Toolbar> 
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(Header);