import { useDispatch } from "react-redux";
import React from 'react';

const ReduxChild = () => {
    const dispatch = useDispatch();

    const handleCounter = () => {
        dispatch({
            type: 'incrementByValue',
            count: 5
        });
    };

    return (
        <div>
            <h1>The increment</h1>
            <button onClick={handleCounter}>Press me</button>
        </div>
    );
};

export default ReduxChild;
