import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform
} from "react-native";

import { Icon } from "native-base";
import { Actions } from "react-native-router-flux";
import { Images, Colors, Metrics, Fonts } from "../Themes";
import FilePickerManager from "react-native-file-picker";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import CloudFireStoreUserHelper from "../Services/CloudFireStoreUserHelper";
import Loading from "../Components/Loading";

const db = firebase.firestore();
class MyClassScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: props.tempUser,
      user_key: "",
      classData: [],
      statusLoading: false
    };
  }
  componentWillMount = () => {
    const { userData } = this.state;
    this.setState({ statusLoading: true });
   
      // CloudFireStoreUserHelper.readClassByTeacherId(
      //   eachData.user_id,
      //   response => {
      //     if (response) {
      //       this.setState({ classData: response, statusLoading: false });
      //     } else {
      //       this.setState({ statusLoading: false });
      //     }
      // });
      CloudFireStoreUserHelper.readClassByStudentId(userData.data.key, response => {
            if (response) {
              this.readAllProfessional(response)
            } else {
              this.setState({ statusLoading: false });
            }
        });
   
  };

  readAllProfessional = async (items) => {
    let professionals = []
		
    
		for (var index in items) {
      console.tron.log('dddddd', items[index].classId)
			let docUser = await db.collection('tbl_class').where('key', '==', `${items[index].classId}`).get()
			console.tron.log('dddddd', docUser)

			let objectData = { ...docUser._docs[0]._data}
			console.tron.log('dddddd', objectData)

			professionals.push(objectData)
		}
		console.tron.log(professionals)
		return this.setState({ classData: professionals, statusLoading: false })
	}

  clickOnEachClass = eachData => {
    Actions.MyClassDetailScreen({ classDetail: eachData });
  };
  render() {
    const { statusLoading, classData } = this.state;
    if (statusLoading) return <Loading />;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            alignItems: "center",
            paddingTop: 10
          }}
        >
          <Text style={{ fontSize: 18, color: "black", fontWight: "bold" }}>
            List All Class
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          {classData.map((eachData, inde) => {
            return (
              <TouchableOpacity
                onPress={() => this.clickOnEachClass(eachData)}
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  backgroundColor: Colors.main_color,
                  padding: 3,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 0.5,
                  borderRadius: 5
                }}
              >
                <View style={{ justifyContent: "center", width: "20%" }}>
                  <Image
                    source={{
                      uri:
                        "https://previews.123rf.com/images/ionutparvu/ionutparvu1612/ionutparvu161200906/67601856-business-class-stamp-sign-text-word-logo-blue-.jpg"
                    }}
                    style={{ width: 45, height: 45, borderRadius: 50 }}
                  />
                </View>
                <View style={{ justifyContent: "center", width: "80%" }}>
                  <Text
                    style={{ color: "white", fontWight: "bold", fontSize: 16 }}
                  >
                    {eachData.classname}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    tempUser: state.tempUser
  };
};

export default connect(
  mapStateToProps,
  null
)(MyClassScreen);
