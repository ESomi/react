import React, { Component, Fragment } from 'react';

class PhoneInfo extends Component {

    state ={
        editing: false,
        name: '',
        phone: '',
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            return true;
        }
        return this.props.info !== nextProps.info;
    }
    

    handleRemove = () => {
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }

    handleToggleEdit = () => { 
        
        const { info, onUpdate } = this.props;
        if (this.state.editing) { // true -> false (적용버튼 눌렀을 때)
        onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone,
            });
        /* props로 받은 handleUpdate함수 실행 :
        info의 id값이 information배열의 id 값과 같을 때,
        info의 id값과 state의 name과 phone값을 App.js의 state에 넣어 줌.
        */
        } else { // false -> true (수정버튼 눌렀을 때)
            this.setState({
                name: info.name,
                phone: info.phone,
            });
        // state에 info의 name과 phone 값 넣어 줌.
        } 
        
        this.setState({
            editing: !this.state.editing, // editing 값 반전 시킴.
        }) 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value //input 박스에서 받아 온 값들을 확인해서 state의 해당 키의 value로 넣어 줌.
        })
    }

    render() {
        const { name, phone, id } = this.props.info;
        const { editing } = this.state;

        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px',
        };  

        console.log(name);

        return (
            <div style = {style}> 
             { JSON.stringify(this.state) }
                {
                    editing ? (
                        <Fragment>
                            <div>
                                <input 
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.name}/>
                            </div>
                            <div>
                                <input 
                                    name="phone" 
                                    onChange={this.handleChange} 
                                    value={this.state.phone}/>
                            </div>
                        </Fragment>
                        
                    ) : (
                        <Fragment>
                            <div><b>{name}</b></div>                
                            <div><b>{phone}</b></div>
                        </Fragment>
                    )
                }
                <button onClick={this.handleRemove}>삭제</button>
                <button onClick={this.handleToggleEdit}>
                    { editing ? '적용' : '수정' }
                </button>
            </div>
        );
    }
}

export default PhoneInfo;