import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { ClassByStudentTypes } from '../Redux/ClassByStudentRedux'
import { ListClassTypes } from '../Redux/ListClassRedux'


import { LoginTypes } from './../Redux/LoginRedux'
import { NewsTypes } from './../Redux/NewsRedux'


/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getClassByStudent } from './ClassByStudentSagas'
import { getListClass} from './ListClassSagas'


import { getLogin } from './LoginSagas'
import { getNews } from './NewsSagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(ClassByStudentTypes.CLASS_BY_STUDENT_REQUEST, getClassByStudent, api),
    takeLatest(ListClassTypes.LIST_CLASS_REQUEST, getListClass, api),

    takeLatest(LoginTypes.LOGIN_REQUEST, getLogin, api),
    takeLatest(NewsTypes.NEWS_REQUEST, getNews, api),


  ])
}
