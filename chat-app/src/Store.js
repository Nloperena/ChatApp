import React from 'react';
import io from 'socket.io-client'


export const CTX = React.createContext();

const initState = {
    general: [
        {from: 'Delane', msg: 'hi'},
        {from: 'Nico', msg: 'hi'},
        {from: 'Eric', msg: 'hi'}
    ],
    general2: [
        {from: 'Beth', msg: 'hi'},
        {from: 'Kelly', msg: 'hi'},
        {from: 'Obama ', msg: 'hi'}
    ]
}

function reducer(state, action) {
    const {from, msg, topic} = action.payload;
    switch(action.type) {
        case 'RECEIVE MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    
                        {from, msg}
                    
                ]
            }

            default:
                return state
    }
}



let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if(!socket) {
        socket = io(':3001')
        socket.on('chat message', function(msg){
            dispatch({type: 'RECEIVE MESSAGE', payload: msg});
          });
        // dispatch({type: 'RECEIVE MESSAGE', payload: msg});

    }

    const user = 'Nicholas' + Math.random(100).toFixed(2)

    
    return(
        <CTX.Provider value ={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
} 

