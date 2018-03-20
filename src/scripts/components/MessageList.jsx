import React, {Component} from 'react';
import Message from './Message';
import PropTypes from 'prop-types';
 
class MessageList extends Component {
    render() {
        return (
            <div className="chart-wrap">
                {this.props.messages.map( message => 
                    <Message timestamp={message.timestamp}
                        owner={message.owner}
                        text={message.text}
                        key={message.id} 
                    />
                )}
            </div>
        );
    }
}

MessageList.propTypes = {
    messages: PropTypes.array
};

MessageList.defaultProps = {
    messages: []
};
 
export default MessageList;