import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {

  id = 3

  state = {
    input: '',
    todos: [
      { id: 0, text: '리액트 소개 a', checked: false },
      { id: 1, text: '리액트 소개 b', checked: true },
      { id: 2, text: '리액트 소개 c', checked: false },
    ]
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    this.setState({
      input: '',
      todos: this.state.todos.concat({
        id: this.id++,
        text: this.state.input,  
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const {todos} = this.state;
    
    // 파라미터로 받은 id를 가지고 todos배열의 몇 번째 객체인지 찾음.(선택한 객체의 index값 생성)
    const index = todos.findIndex( todo => todo.id === id ); 
    // todos배열을 복사해서 새로운 배열을 생성.
    console.log(index)
    const nextTodos = [ ...todos ];
    // todos배열 중 index번째 객채(선택한 객체)의 checked값을 반전시킴.
    nextTodos[index] = {
      ...todos[index],
      checked: !todos[index].checked
    };
    // todos배열의 상태를 새로운 todos배열으로 업데이트
    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    this.setState({
      todos: this.state.todos.filter( todo => todo.id !== id)
    });
  }


  render() {
    return (      
        <TodoListTemplate form={
          <Form
            value={this.state.input}
            onChange={this.handleChange}
            onCreate={this.handleCreate}
            onKeyPress={this.handleKeyPress}
          />
        }>
          <TodoItemList todos={this.state.todos} onToggle={this.handleToggle} onRemove ={this.handleRemove}/>
        </TodoListTemplate>
    );
  }
}

export default App;