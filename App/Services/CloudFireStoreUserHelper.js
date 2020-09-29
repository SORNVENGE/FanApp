import firebase from "react-native-firebase";

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
    db.collection("tbl_user")
      // .where("username", "==", `${username}` , "password", "==", `${password}`)
      .where("username", "==", `${username}` )
      .where("password", "==", `${password}`)
      .onSnapshot(function (querySnapshot) {
        let newObjectData = {};
        querySnapshot.forEach(function (doc) {
          if (doc) {
            newObjectData = { ...doc.data(), ...{ user_id: doc.id } };
          }
        });
        return callback(newObjectData);
      })
  },
  readUserRoleById: function (roleId, callback) {
    db.collection("tbl_role")
      .where("key", "==", `${roleId}`)
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), ...{ role_id: doc.id } };
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      })
  },
  readClassByTeacherId: function (teacherId, callback) {
    db.collection("tbl_class")
      .where("teacherId", "==", `${teacherId}`)
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), ...{ class_id: doc.id } };
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      })
  },

  readClassByStudentId: function (studentId, callback) {
    db.collection("tbl_student_class")
      .where("studentId", "==", `${studentId}`)
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), ...{ class_id: doc.id } };
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      })
      
  },
  
  readElearningVideo: function (classId, callback) {
    db.collection('tbl_elearning_video').where('lessionId', '==', `${classId}`).onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), ...{ document_id: doc.id } }
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      });
  },

  readLession: function (classId, callback) {
    db.collection('tbl_lession').where('classId', '==', `${classId}`).onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), ...{ document_id: doc.id } }
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      });
  },

  readStudentByClassId: function (classId, callback) {
    db.collection("users")
      .where("role", "==", "STUDENT")
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            doc.data().classes.forEach(function (eachClasses) {
              if (eachClasses == classId) {
                let concatObj = { ...doc.data(), ...{ user_id: doc.id } };
                newObjectData.push(concatObj);
              }
            });
          }
        });
        return callback(newObjectData);
      })
      
  },

  readSubjectById: function (key, callback) {
    db.collection("tbl_subject")
      .where("key", "==", `${key}`)
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];

        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), ...{ subjectId: doc.id } };
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      })
      
  },
  readLevelById: function (key, callback) {
    db.collection("tbl_level")
      .where("key", "==", `${key}`)
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];

        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), ...{ levelId: doc.id } };
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      })
      
  },
  readSessionById: function (key, callback) {
    db.collection("tbl_session")
      .where("key", "==", `${key}`)
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), ...{ sessionId: doc.id } };
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      })
      
  },

  readStudentClass: function (classId, callback) {
    db.collection("tbl_student_class")
      .where("classId", "==", `${classId}`)
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), ...{ document_id: doc.id } };
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      })
      
  },

  readStudentById: function (studentId, callback) {
    db.collection("tbl_user")
      .where("key", "==", `${studentId}`)
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data() };
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      })
      
  },

  addDocumentByUser: function (data, callback) {
    var documentRef = db.collection("tbl_documents");
    documentRef.add(data).then(function (querySnapshot) {
      var status = true;
      return callback(status);
    });
  },
  readDocument: function (lessionId, callback) {
    db.collection("tbl_documents")
    .where("lessionId", "==", `${lessionId}`)
    .onSnapshot(function (querySnapshot) {
      let newCollectionObj = [];
      querySnapshot.forEach(function (doc) {
        if (doc) {
          let concatObj = { ...doc.data() };
          newCollectionObj.push(concatObj);
        }
      });
      return callback(newCollectionObj);
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

  readElearning: function (callback) {
    db.collection("tbl_elearning").onSnapshot(function (querySnapshot) {
      let newCollectionObj = [];
      querySnapshot.forEach(function (doc) {
        if (doc) {
          let concatObj = { ...doc.data() };
          newCollectionObj.push(concatObj);
        }
      });
      return callback(newCollectionObj);
    });
  },

  readGradeElearning: function (uid, callback) {
    db.collection("tbl_elearning_grade")
      .where("mainElearning", "==", `${uid}`)
      .onSnapshot(function (querySnapshot) {
        let newCollectionObj = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data() };
            newCollectionObj.push(concatObj);
          }
        });
        return callback(newCollectionObj);
      });
  },

  readDocByLessionId: function (id, callback) {
    db.collection("tbl_documents")
      .where("lessionId", "==", `${id}`)
      .onSnapshot(function (querySnapshot) {
        let newCollectionObj = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data() };
            newCollectionObj.push(concatObj);
          }
        });
        return callback(newCollectionObj);
      });
  },

  readSubjectElearning: function (uid, callback) {
    db.collection("tbl_elearning_subject")
      .where("mainGrade", "==", `${uid}`)
      .onSnapshot(function (querySnapshot) {
        let newCollectionObj = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data() };
            newCollectionObj.push(concatObj);
          }
        });
        return callback(newCollectionObj);
      });
  },

  readVideoElearning: function (uid, callback) {
    db.collection("tbl_elearning_video")
      .where("mainSubject", "==", `${uid}`)
      .onSnapshot(function (querySnapshot) {
        let newCollectionObj = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data() };
            newCollectionObj.push(concatObj);
          }
        });
        return callback(newCollectionObj);
      });
  },

  addVideo: function (data, callback) {
    var addChannelBetting = db.collection("tbl_elearning_video")
    addChannelBetting.add(data).then(function (querySnapshot) {
        var id = querySnapshot._documentPath._parts[1]
        db.collection("tbl_elearning_video").doc(id).update({
            id: id
        });
        var status = true
        return callback(status);
    })
  },

  addLession: function (data, callback) {
    var addChannelBetting = db.collection("tbl_lession")
    addChannelBetting.add(data).then(function (querySnapshot) {
        var id = querySnapshot._documentPath._parts[1]
        db.collection("tbl_lession").doc(id).update({
            id: id
        });
        var status = true
        return callback(status);
    })
  },

  readAdmission: function (callback) {
    db.collection("tbl_admission").onSnapshot(function (querySnapshot) {
      let newCollectionObj = [];
      querySnapshot.forEach(function (doc) {
        if (doc) {
          let concatObj = { ...doc.data(), status: false };
          newCollectionObj.push(concatObj);
        }
      });
      return callback(newCollectionObj);
    });
  },

  deleteVideo: function (child_key) {
    db.collection('tbl_elearning_video').doc(child_key).delete()
  },
  deleteLession: function (child_key) {
    db.collection('tbl_lession').doc(child_key).delete()
  },
  readMainProgram: function (callback) {
    db.collection("tbl_main_program")
      .orderBy("id")
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), programId: doc.id };
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      });
  },
  readFee: function (callback) {
    db.collection("tbl_fee")
      .orderBy("id")
      .onSnapshot(function (querySnapshot) {
        let newObjectData = [];
        querySnapshot.forEach(function (doc) {
          if (doc) {
            let concatObj = { ...doc.data(), feeId: doc.id };
            newObjectData.push(concatObj);
          }
        });
        return callback(newObjectData);
      });
  },


  readNews: function (callback) {
    db.collection("tbl_news").onSnapshot(function (querySnapshot) {
      let newCollectionObj = [];
      querySnapshot.forEach(function (doc) {
        if (doc) {
          let concatObj = { ...doc.data() };
          newCollectionObj.push(concatObj);
        }
      });
      return callback(newCollectionObj);
    });
  },
};
export default CloudFireStoreUserHelper;
