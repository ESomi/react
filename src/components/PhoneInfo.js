import React, { Component } from 'react';

class PhoneInfo extends Component {



    render() {
        const { name, phone, id } = this.props.info;
        const { onRemove } = this.props;

        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px',
        };  

        return (
            <div style = {style}> 
                <div><b>{name}</b></div>                
                <div><b>{phone}</b></div>
                <button onClick={
                    () => { onRemove(id) }                
                }>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;