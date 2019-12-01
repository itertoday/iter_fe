import React from 'react';
import Spinner from './components/spinner';


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
        this.url = 'ws://localhost:8888/ws';
        this.ws = new WebSocket(this.url);
        this.ws.onmessage = onMessage;   
    }
    
}