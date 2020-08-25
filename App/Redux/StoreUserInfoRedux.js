import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeUserInfoRequest: ['data'],
  clearUserInfoRequest:[]
})

export const StoreUserInfoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  data: null
})

/* ------------- Selectors ------------- */

export const StoreUserInfoSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>{
  return state.merge({ fetching: false, data, error: null })
}

export const clearUserInfoSuccess = (state,{ data }) => {
  return state.merge({ fetching: false, error: null,data:null})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_USER_INFO_REQUEST]: request,
  [Types.CLEAR_USER_INFO_REQUEST]: clearUserInfoSuccess
})
