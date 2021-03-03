import React from 'react';
import ContactInfo from './ContactInfo'
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update'

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
      this.handleReset = this.handleReset.bind(this);

      this.handleCreate = this.handleCreate.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
    }
    
    componentWillMount() {
      const contactData = localStorage.contactData;

      if(contactData) {
        this.setState({
          contactData: JSON.parse(contactData)
        })
      }
    }

    componentDidUpdate(prevProps, preState) {
      if(JSON.stringify(preState.contactData) !== JSON.stringify(this.state.contactData)) {
        localStorage.contactData = JSON.stringify(this.state.contactData);
      }
    }

    //설정된 key값이 selectedKey 상태값으로 세팅됨.
    handleClick(key) {
      this.setState({ 
        selectedKey: key
      });

      console.log(key+'th is selected')

    }
    handleChange(e) {
      this.setState({
        keyword: e.target.value
      });
    }

    handleReset() {
      localStorage.clear();
      window.location.reload();
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
      if(this.state.selectedKey === -1) {
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
      // if(name ==='' &&)
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
      const mapToComponents = (data) => {
        data.sort((a,b) => { return a.name > b.name; }); // 알파벳 순서로 정렬

        data = data.filter(
          (contact) => {
            //contact목록에 검색한 keword가 있으면 true 리턴
            return contact.name.toLowerCase()
              .indexOf(this.state.keyword.toLowerCase()) > -1;
          }
        )  

        return data.map((contact, i) => {  
          return (<ContactInfo
                    contact = {contact}
                    key = {i} //contact배열의 인덱스 순으로 key값을 설정함.
                    onClick = {() => {this.handleClick(i)}} // 클릭시 key의 상태값 세팅
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
            { mapToComponents(this.state.contactData)}  
          </div>

          <button onClick={this.handleReset}>Initial Data</button>  
          
          <ContactDetails 
            isSelected = {this.state.selectedKey !== -1} // 클릭 시 selectedKey 상태값이 설정됨. 
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
