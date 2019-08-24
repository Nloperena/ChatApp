import React from 'react';
import io from 'socket.io-client'


export const CTX = React.createContext();

const initState = {
    Chat1: [
        {from: 'Delane', msg: 'Hello'},
        {from: 'Nico', msg: 'Welcome to my chat app'},
        {from: 'Eric', msg: 'Open two pages to get started'}
    ],
    Chat2: [
        {from: 'Beth', msg: 'This is a second page'},
        {from: 'Kelly', msg: 'If you leave the app messages will not be saved because they are not dupilacted in a database'},
        {from: 'Obama ', msg: 'I am the 44th president of the U.S.A.'}
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

    const user = 'User#' + Math.random(100).toFixed(2)

    
    return(
        <CTX.Provider value ={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
} 

