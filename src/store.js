import {configureStore} from "@reduxjs/toolkit";
import { counterReduce } from "./reducers/Incounter";

const store= configureStore({
    reducer:{
        counter:counterReduce
    }
})
export default store;