import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfo from './components/PhoneInfo';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  id = 3;
  
  state = {
    information: [
      {
        id: 0,
        name: '로제스',
        phone: '010-000-0001'
      },
      {
        id: 1,
        name: '홍당무',
        phone: '010-000-0002'
      },
      {
        id: 2,
        name: '잎새달',
        phone: '010-000-0003'
      },
    ],
  }

  handleCreate = (data) => { 
    const {information} = this.state
    this.setState({
      information: information.concat({
        ...data, // PhoneFrom.js에서 받은 { name: 'a', phone: '1',},
        id: this.id++ // id: 0 을 객체에 넣은 후 1 증가
      }) 
      //->information: [{ name: 'a', phone: '1', id: 0,}]
    });
  }

  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      information: information.filter(
        info => info.id !== id
      )
    })
  }

  handleUpdate = (id, data) => {
    const {information} = this.state;
    this.setState({
      information: information.map(
        info => {
          if(info.id === id) {
            return {
              id,
              ...data,
            };
          }
          return info;
        } 
      )
    });
  }

  render() {     
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        <PhoneInfoList 
          data={this.state.information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
        { JSON.stringify(this.state) }
      </div>
    );
  }
}

export default App;