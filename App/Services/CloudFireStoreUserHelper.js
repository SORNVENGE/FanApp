import firebase from 'react-native-firebase';

const db = firebase.firestore();

const CloudFireStoreUserHelper = {
    // isAccountExisting: function (uid, callback) {
    //     db.collection("users").doc(uid)
    //         .get()
    //         .then(function (doc) {
    //             if (doc.exists) {
    //                 return callback(true, doc.data());
    //             } else {
    //                 return callback(false, null);
    //             }
    //         }).catch(function (error) {
    //         }
    //         );
    // },

    // isRoleExisting: function (role_id, callback) {
    //     db.collection("role").doc(role_id)
    //         .get()
    //         .then(function (doc) {
    //             if (doc.exists) {
    //                 return callback(doc.data());
    //             } else {
    //                 return callback(null);
    //             }
    //         }).catch(function (error) {
    //         }
    //         );
    // },
    readAllUser: function (username, password, callback) {
        db.collection('users').where('username', '==', `${username}`, 'password', '==', `${password}`).get()
            .then(function (querySnapshot) {
                let newObjectData = [];
                querySnapshot.forEach(function (doc) {
                    if (doc) {
                        let concatObj = { ...doc.data(), ...{ user_id: doc.id } }
                        newObjectData.push(concatObj);
                    }
                });
                return callback(newObjectData);
            }).catch(err => {
                console.tron.log({ err: err });
            });
    },
    readClassByTeacherId: function (teacherId, callback) {
        db.collection('class').where('teacher_id', '==', `${teacherId}`).get()
            .then(function (querySnapshot) {
                let newObjectData = [];
                querySnapshot.forEach(function (doc) {
                    if (doc) {
                        let concatObj = { ...doc.data(), ...{ user_id: doc.id } }
                        newObjectData.push(concatObj);
                    }
                });
                return callback(newObjectData);
            }).catch(error => {
                console.tron.log({ error: error });
            });
    },

    readStudentByClassId: function (classId, callback) {
        db.collection('users').where('role', '==', 'STUDENT').get()
            .then(function (querySnapshot) {
                let newObjectData = [];
                querySnapshot.forEach(function (doc) {
                    if (doc) {
                        doc.data().classes.forEach(function (eachClasses) {
                            if (eachClasses == classId) {
                                let concatObj = { ...doc.data(), ...{ user_id: doc.id } }
                                newObjectData.push(concatObj);
                            }
                        })

                    }
                });
                return callback(newObjectData);
            }).catch(error => {
                console.tron.log({ error: error });
            });
    },
    addDocumentByUser: function (data, callback) {
        var documentRef = db.collection("Documents")
        documentRef.add(data).then(function (querySnapshot) {
            var status = true
            return callback(status);
        })
    },
    readDocument: function (callback) {
        db.collection('Documents').get()
            .then(function (querySnapshot) {
                let newObjectData = [];
                querySnapshot.forEach(function (doc) {
                    if (doc) {
                        let concatObj = { ...doc.data(), ...{ document_id: doc.id } }
                        newObjectData.push(concatObj);
                    }
                });
                return callback(newObjectData);
            }).catch(error => {
                console.tron.log({ error: error });
            });
    },
    













    // readUserRold: function (callback) {
    //     db.collection("role").get()
    //         .then(function (querySnapshot) {
    //             querySnapshot.forEach(function (doc) {
    //                 if (doc) {
    //                     return callback(doc);
    //                 }
    //             }
    //             );
    //         });
    // },
    // readAllUser: function (limit, lastVisible, callback) {
    //     if (lastVisible) {
    //         var query = db.collection("users").orderBy('uid').startAfter(lastVisible).limit(limit);
    //     } else {
    //         var query = db.collection("users").orderBy('uid').limit(limit);
    //     }
    //     query.get()
    //     .then(function(querySnapshot) {
    //         if(querySnapshot._docs.length  > 0){
    //             return callback(querySnapshot);
    //         } else{
    //             return callback(false);
    //         }
    //     });
    // },

    // readNotification: function (mobile_token,callback) {
    //     db.collection('notification').where('mobile_token' , '==', `${mobile_token}`).get()
    //     .then(function (querySnapshot) {
    //         let newObjectData = [];
    //         querySnapshot.forEach(function(doc) {
    //             if(doc){
    //                 let concatObj = {...doc.data(),id:doc.id}
    //                 newObjectData.push(concatObj);
    //             }
    //         });
    //         return callback(newObjectData);
    //     });
    // },
}
export default CloudFireStoreUserHelper;