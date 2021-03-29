import React from 'react';
import './Form.css';

const Form = ({value, onChange, onCreate, onKeyPress}) => {
    return (
        <div className="form">
            <input 
                value={value} // this.state.input (App.js에서 전달하는 props값)
                onChange={onChange} // this.handleChange
                onKeyPress={onKeyPress} // this.handleKeyPress
            >
            </input>
            <div className="create-button" onClick={onCreate} // this.handleCreate 
            >추가
            </div>
        </div>
    );
};

export default Form;