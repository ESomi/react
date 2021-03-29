import React, { Component } from 'react';
import './TodoItem.css'

class TodoItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
    }

    render() {
        const { id, text, checked, onToggle, onRemove } = this.props;
 
        // console.log(id)

        return (
            <div className="todo-item" onClick={() => onToggle(id)} // this.props.onToggle <- this.handleToggle함수를 전달받음. 파라미터로 id를 전달함.
            > 

                <div className="remove" 
                    onClick={ (e) => {
                        e.stopPropagation();
                        onRemove(id)
                        } }                                        
                >&times;
                </div>

                <div className={`todo-text ${checked && 'checked'}`}>
                    <div>{text}</div>
                </div>

                { checked && 
                    (<div className="check-mark">&#x2713;</div>)
                }

            </div>
        );
    }
}

export default TodoItem;