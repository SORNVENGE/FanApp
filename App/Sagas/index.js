import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { ClassByStudentTypes } from '../Redux/ClassByStudentRedux'
import { ListClassByTeacherTypes } from '../Redux/ListClassByTeacherRedux'

import { ListClassTypes } from '../Redux/ListClassRedux'
import { ListStudentTypes } from '../Redux/ListStudentRedux'
import { ListStudentByClassTypes } from '../Redux/ListStudentByClassRedux'
import { ListLessionByClassTypes } from '../Redux/ListLessionByClassRedux'
import { DeleteLessionByClassTypes } from '../Redux/DeleteLessionByClassRedux'
import { AddLessionByClassTypes } from '../Redux/AddLessionByClassRedux'
import { UploadFileTypes } from '../Redux/UploadFileRedux'
import { ListDocByLessonTypes} from '../Redux/ListDocByLessonRedux'
import { DeleteLessonTypes} from '../Redux/DeleteLessonRedux'

import { UploadDocumentFilesTypes } from '../Redux/UploadDocumentFilesRedux'


import { LoginTypes } from './../Redux/LoginRedux'
import { NewsTypes } from './../Redux/NewsRedux'


/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getClassByStudent } from './ClassByStudentSagas'
import { getListClassByTeacher } from './ListClassByTeacherSagas'

import { getListClass} from './ListClassSagas'
import { getListStudent} from './ListStudentSagas'

import { getListStudentByClass} from './ListStudentByClassSagas'
import { getListLessionByClass} from './ListLessionByClassSagas'

import { getDeleteLessionByClass} from './DeleteLessionByClassSagas'
import { getAddLessionByClass} from './AddLessionByClassSagas'
import { getUploadFile} from './UploadFileSagas'
import { getListDocByLesson} from './ListDocByLessonSagas'
import { getDeleteLesson} from './DeleteLessonSagas'

import { getUploadDocumentFiles} from './UploadDocumentFilesSagas'


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
    takeLatest(ListStudentByClassTypes.LIST_STUDENT_BY_CLASS_REQUEST, getListStudentByClass, api),
    takeLatest(ListStudentTypes.LIST_STUDENT_REQUEST, getListStudent, api),
    takeLatest(ListLessionByClassTypes.LIST_LESSION_BY_CLASS_REQUEST, getListLessionByClass, api),
    takeLatest(DeleteLessionByClassTypes.DELETE_LESSION_BY_CLASS_REQUEST, getDeleteLessionByClass, api),
    takeLatest(AddLessionByClassTypes.ADD_LESSION_BY_CLASS_REQUEST, getAddLessionByClass, api),
    takeLatest(UploadFileTypes.UPLOAD_FILE_REQUEST, getUploadFile, api),
    takeLatest(ListDocByLessonTypes.LIST_DOC_BY_LESSON_REQUEST, getListDocByLesson, api),
    takeLatest(DeleteLessonTypes.DELETE_LESSON_REQUEST, getDeleteLesson, api),
    takeLatest(ListClassByTeacherTypes.LIST_CLASS_BY_TEACHER_REQUEST, getListClassByTeacher, api),
    
    takeLatest(UploadDocumentFilesTypes.UPLOAD_DOCUMENT_FILES_REQUEST, getUploadDocumentFiles, api),
    
    takeLatest(LoginTypes.LOGIN_REQUEST, getLogin, api),
    takeLatest(NewsTypes.NEWS_REQUEST, getNews, api),

  ])
}
