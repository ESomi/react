import React, { Component } from 'react';

class PhoneForm extends Component {

    state = {
        name: '',
        phone: '',
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        });

    }
    render() {
        return (
            <form>
                <input name="name" placeholder="이름" onChange={this.handleChange} value={this.state.name}/>
                {this.state.name}
                <input name="phone" placeholder="전화번호" onChange={this.handleCahnge} value={this.state.phone}/> 
            </form>
        );
    }
}   

export default PhoneForm;