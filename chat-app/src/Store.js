import React from 'react';
import { red } from '@material-ui/core/colors';

const CTX = React.createContext();

export default function Store() {

    const reducer = React.useReducer(reducer, initState);
    return(
        <CTX.Provicder value ={}>
            {props.children}
        </CTX.Provicder>
    )
} 