import React from 'react';
 
const Message = (props) => (
    <div className="message">
        <span className="message-time">{new Date(props.timestamp ).toISOString().substr(11, 8)}&nbsp;</span> 
        <strong className="message-owner">{props.owner}:&nbsp;&nbsp;</strong>
        <span className="message-text">{props.text}</span>
    </div>
);
 
export default Message;