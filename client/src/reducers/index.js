import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import authReducer from './auth'
import dashboarReducer from './dashboard'

const reducers =  combineReducers({
    form: formReducer,
    auth: authReducer,
    dash: dashboarReducer
});

//module.export = reducers;
export default reducers;