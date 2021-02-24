import React, { Component } from 'react';
import ContactDetails from './ContactDetails';
import ContactInfo from './ContactInfo'

class Contact extends React.Component {
    constructor(props){
      super(props);
      this.state = { 
        selectedKey: -1,
        keyword:'',
        contactData: [
          {name: 'Abet', phone: '010-0000-0001'},  
          {name: 'Betty', phone: '010-0000-0002'},  
          {name: 'Charlie', phone: '010-0000-0003'},  
          {name: 'David', phone: '010-0000-0004'}  
        ]  
      }  
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);

    }
    
    handleClick(key) {
      this.setState({
        selectedKey: key
      });

      console.log(key+' is selected')

    }
    handleChange(e) {
      this.setState({
        keyword: e.target.value
      });
    }
    render() { 
      // 컴포넌트 매핑 
      const mapToComponent = (data) => {
        //1. sort
        data.sort();
        //2. filter
        data = data.filter(
          (contact) => {
            //contact목록에 검색한 keword가 있으면 true 리턴
            return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase() > -1);
          }
        )  
        //3. map 결과 리턴
        return data.map((contact, i) => {  
          //contct라는 props에 값을 주고, contact 배열의 인덱스 순으로 키값을 줌.
          return (<ContactInfo
                    contact = {contact}
                    key = {i}
                    onClick = {() => {this.handleClick(i)
                    console.log(i+"번째")
                    }}
          />);
        });  
      };
  
      return (  
        <div>
          <h1>Contacts</h1>
          <input 
            name="keyword" 
            placeholder="Search" 
            value = {this.state.keyword} 
            // 입력한 값이 keyword라는 이름으로 상태관리됨.
            onChange = {this.handleChange}
            // input에 입력하면 keyword의 상태값이 바뀜.
          />  
          <div>
            {/*state의 contactData를 mapToComponent의 매개변수로 전달하여, ContactInfo의 contact props에 값을 전달함.*/}
            { mapToComponent(this.state.contactData)}  
          </div>
          <ContactDetails 
            isSelected = {this.state.selectedKey != -1} //조건절
            contact = {this.state.contactData[this.state.selectedKey]} /> 
        </div>
      );  
    }  
  };

export default Contact;
