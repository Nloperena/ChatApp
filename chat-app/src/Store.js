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

export default function Store(props) {

    if(!socket) {
        socket = io(':3001')
    }

    const reducerHook = React.useReducer(reducer, initState);
    return(
        <CTX.Provider value ={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
} 