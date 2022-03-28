import { combineReducers } from 'redux'
import homeListReducer from './home/home-list-reducer'

const rootReducer = combineReducers({
    homeList: homeListReducer
})

export default rootReducer
