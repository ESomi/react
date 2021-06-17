// import Typing from './Typing'
// import Showing from './Showing'

import App from '../App'
import { connect } from 'react-redux';
import * as actions from '../actions';

import io from 'socket.io-client'
const socket = io.connect("http://localhost:8005");


// export default class App extends Component {
//     render() {
//         return ( 
//             <div>
//                 <Showing chatList = {this.props.chatList}>
//                 </Showing>
//                 <Typing>
//                     onTyping={this.props.handleReceive}
//                 </Typing>
//             </div>
//         )
//     }
// 

const setUserId = dispatch => {
    socket.on('userId', (data) => {
        console.log('userId : ' , data);
        dispatch(actions.setUserId(data.userId));
    });
    socket.on('receive', (data) => {
        console.log('received data : ', data);
        dispatch(actions.receive(data));
    });
}

const mapStateProps = (state) => {
    return {
        state
        // chatList: state.chat.chatList,
        // userId: state.chat.userId
    }
}

const mapDispatchProps = (dispatch) => {
    setUserId(dispatch)
    return {
        handleEnter: () => {
            socket.emit('enter');
        },
        handleLeave: () => {
            socket.emit('leave');
        },
        handleSend: (chat) => {
            socket.emit('send', {type: 'message', name: socket.id, message: chat})
        },
        handleClear: () => {
            dispatch(actions.clear());
        }
    }
}
export default connect(mapStateProps, mapDispatchProps)(App);
