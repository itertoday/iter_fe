import React from 'react';
import Spinner from './components/spinner';
import {server} from '../package.json';

const {notification} = server;

export const LoadingComponent = (Component) => {
    return function Loading({ isLoaded, ...props }) {
        if (isLoaded) {
            return <Component {...props} />
        }
        return <Spinner />
    };
}

export class NotifyClientReader {
    constructor(onMessage){
        this.url = notification;
        this.ws = new WebSocket(this.url);
        this.ws.onmessage = onMessage;   
    }
    
}