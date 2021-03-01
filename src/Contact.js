import React from 'react';
import ContactDetails from './ContactDetails';
import ContactInfo from './ContactInfo'
import update from 'react-addons-update'
import ContactCreate from './ContactCreate';

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

      this.handleCreate = this.handleCreate.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
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

    handleCreate(contact) {
      this.setState({
        contactData: update(
          this.state.contactData,
          { $push: [contact] }
        )
      });
    }

    handleRemove() {
      if(this.state.selectedKey == -1) {
        return;
      }
      this.setState({
        contactData: update(
          this.state.contactData,
          { $splice: [[this.state.selectedKey, 1]]}
        ),
        selectedKey: -1
      })
    }

    handleEdit(name, phone) {
      this.setState({
        contactData: update(
          this.state.contactData,
          {
            [this.state.selectedKey]: {
              name: { $set: name },
              phone: { $set: phone }
            }
          }
        )
      })
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
          //contct라는 props에 값을 주고,
          //contact 배열의 인덱스 순으로 key값을 설정함.
          //클릭하면 설정된 key값이 state의 selectedKey 값으로 세팅됨.
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
            isSelected = {this.state.selectedKey !== -1} //클릭을 했다면
            contact = {this.state.contactData[this.state.selectedKey]} 
            onRemove = {this.handleRemove}
            onEdit = {this.handleEdit}
          />
          <ContactCreate onCreate = { this.handleCreate }/>
        </div>
      );  
    }  
  };

export default Contact;
