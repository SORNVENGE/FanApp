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


    readAllUser: function (callback) {
        db.collection("users").get()
            .then(function (querySnapshot) {
                let objeData = [];
                querySnapshot.forEach(function (doc) {
                    if (doc) {
                        let mergeData = { ...doc.data(), ...{ userId: doc.id } }
                        objeData.push(mergeData);
                    }
                });
                return callback(objeData);
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