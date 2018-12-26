/**
 * 将所有的reducers整合
 **/
import {combineReducers} from 'redux';
// import counter from './reducers/counter';
import userInfo from './reducers/userInfo';

export default combineReducers({
    userInfo
})