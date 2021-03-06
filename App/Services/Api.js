// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
// const create = (baseURL = 'https://fan-international-school.com/api:3000/') => {
    const create = (baseURL = 'https://fan-international-school.com/api/') => {

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijoic3R1ZmYiLCJpYXQiOjE2MDIzMTEzOTl9.vrI-o2KRre4JZfXCbB_mRe3pyJsPaooHjD2wZTp5Skw'
    },
    // 10 second timeout...
    timeout: 60000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const getClassByStudent = (data) => api.get('students/' + data.studentId + '/classes')
  const getListClass = (data) => api.get('/classes')
  const getListStudent = (data) => api.get('/users')
  const getLogin = (data) => api.post('users/login',data) 
  const getListStudentByClass = (data) => api.get('classes/' + data.classId + '/students')
  const getListLessionByClass = (data) => api.get('classes/' + data.classId + '/lessons')
  const getDeleteLessionByClass = (data) => api.delete('classes/' + data.classId + '/lessons/' + data.lessionId)
  const getAddLessionByClass = (data) => api.post('classes/' + data.classId + '/lessons', data)
  const getUploadFile = (data) => api.post('lessons/' + data.lessionId + '/docs', data)
  const getListDocByLesson = (data) => api.get('lessons/' + data.lessionId + '/docs')
  const getDeleteLesson = (data) => api.delete('lessons/' + data.lessionId + '/docs/' + data.docsId)
  const getListClassByTeacher = (data) => api.get('classes?teacher=' + data.teacherName )
   
  const getUploadDocumentFiles = (data) => api.post('upload', data)

  const getNews =(data) =>api.get('/news')


  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    getClassByStudent,
    getListClass,
    getListStudent,
    getLogin,
    getListStudentByClass,
    getListLessionByClass,
    getDeleteLessionByClass,
    getAddLessionByClass,
    getUploadFile,
    getListDocByLesson,
    getDeleteLesson,
    getListClassByTeacher,
    getNews,
    getUploadDocumentFiles

  }
}

// let's return back our create method as the default.
export default {
  create
}
