import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    render() {

        const { todos, onToggle, onRemove } = this.props;

        const todoItemList = todos.map( // this.props.todos <- this.state.todos값({id, text, checked})을 전달받음.
            ({id, text, checked}) => (
                <TodoItem 
                    id={id}
                    text={text}
                    checked={checked}
                    onToggle={onToggle} // this.props.onToggle <- this.handleToggle함수를 전달받음. (파라미터: id)
                    onRemove={onRemove} // this.props.onRemove <- this.handleRemove함수를 전달받음. (파라미터: id)
                    key={id}
                />
            )
        );

    return (
            <div>
                { todoItemList }
            </div>
        );
    }
}

export default TodoItemList;


