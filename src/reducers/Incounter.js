import {createReducer} from "@reduxjs/toolkit";
import React from 'react'
const initialvalue={
    c:0
}


export const counterReduce=createReducer(initialvalue,{
    increment:(state,action)=>{
        state.c+=1
    },
    incrementByValue:(state,action)=>{
        state.c+=action.count;
    }
})

