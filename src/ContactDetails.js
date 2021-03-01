import React, { Component } from 'react';

class ContactDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            name: '',
            phone:''
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleToggle() {
        //isEdit: true일때 (Edit버튼 클릭 시)
        if(!this.state.isEdit) { 
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        //isEdit: false일때 (OK 버튼 클릭 시)
        } else {    
            this.handleEdit();
        }
         
        // isEdit 상태 반전(false <-> true)
        this.setState({
            isEdit : !this.state.isEdit
        });
        console.log(this.state.isEdit);
    }

    render() {
        
        const details = (
            <div>
            <p>{this.props.contact.name}</p>
            <p>{this.props.contact.phone}</p>                
            </div>);

        const edit = (
            <div>
                <p>
                    <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}></input>     
                </p>
                <p>
                    <input type="text" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange}></input>
                </p>
            </div>
        );
        const view = this.state.isEdit ? edit : details
        const blank = (<div>Not Selected</div>);
        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? view : blank}
                <p>
                    <button onClick={this.handleToggle}> { this.state.isEdit ? 'OK' : 'Edit' }</button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
                
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    }
}

export default ContactDetails;