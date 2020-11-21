import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  header: require('./HeaderRedux').reducer,
  footer: require('./FooterRedux').reducer,
  language: require('./LanguageRedux').reducer,
  tempUser: require('./StoreUserInfoRedux').reducer,
  getClassByStudent:require('./ClassByStudentRedux').reducer,
  getClassByTeacher:require('./ListClassByTeacherRedux').reducer,

  getListClass:require('./ListClassRedux').reducer,
  getListStudent:require('./ListStudentRedux').reducer,
  getStudentByClass:require('./ListStudentByClassRedux').reducer,
  getLessionByClass:require('./ListLessionByClassRedux').reducer,
  deleteLessionByClass:require('./DeleteLessionByClassRedux').reducer,
  addLessionByClass:require('./AddLessionByClassRedux').reducer,
  uploadFile:require('./UploadFileRedux').reducer,
  getListDocByLesson:require('./ListDocByLessonRedux').reducer,
  deleteLesson:require('./DeleteLessonRedux').reducer,

  uploadDocumentFiles:require('./UploadDocumentFilesRedux').reducer,


  login: require('./LoginRedux').reducer,
  getNews: require('./NewsRedux').reducer,
  

})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return store
}
