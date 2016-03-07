import { push } from 'react-router-redux'
import {LOGIN_SUCCESS} from '../modules/LoginPage/actions'

export default store => next => action => {
    if (action.type === LOGIN_SUCCESS) {
        store.dispatch(push('/jobs'));
    }
    return next(action);
}