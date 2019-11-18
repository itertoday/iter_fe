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