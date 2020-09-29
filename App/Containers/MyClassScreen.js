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
    var roleName = ""
    CloudFireStoreUserHelper.readUserRoleById(
      userData.data.roleId,
      response => {
        if (response) {
          if (response[0].roleName == "Student") {
            CloudFireStoreUserHelper.readClassByStudentId(userData.data.key, response => {
              ({ ResponeStudent: response })
              if (response) {
                this.readAllProfessional(response)
              } else {
                this.setState({ statusLoading: false });
              }
            });
          }
          if (response[0].roleName == "Teacher") {
            CloudFireStoreUserHelper.readClassByTeacherId(
              userData.data.key,
              response => {
                if (response) {
                  this.setState({ classData: response, statusLoading: false });
                } else {
                  this.setState({ statusLoading: false });
                }
              });
          }
        } else {
          this.setState({ statusLoading: false });
        }
      });

  };
  readAllProfessional = async (items) => {
    let professionals = []
    for (var index in items) {
      let docUser = await db.collection('tbl_class').where('key', '==', `${items[index].classId}`).get()
      let objectData = { ...docUser._docs[0]._data }
      professionals.push(objectData)
    }
    return this.setState({ classData: professionals, statusLoading: false })
  }

  clickOnEachClass = eachData => {
    Actions.MyClassDetailScreen({ classDetail: eachData });
  };
  render() {
    const { statusLoading, classData, userData } = this.state;
    if (statusLoading) return <Loading />;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={{margin: 10,alignItems:'center'}}>
          <Text style={{ fontSize: 24, color: "black", fontWight: "bold",color:Colors.main_color }}>
            {userData.data.username}
          </Text>
          <Text style={{ fontSize: 18, color: "black", fontWight: "bold",color:Colors.main_color }}>
            {userData.data.phone}
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          {classData.map((eachData, inde) => {
            return (
              <TouchableOpacity
                onPress={() => this.clickOnEachClass(eachData)}
                style={{
                  flexDirection: "row",
                  backgroundColor: Colors.main_color,
                  padding: 3,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 0.5,
                  borderRadius: 5,
                  marginBottom: 15,
                }}
              >
                <View style={{ justifyContent: "center", width: "20%" }}>
                  <Image
                    source={{
                      uri:
                        "https://www.iconfinder.com/data/icons/education-flat-icon-1/130/135-512.png"
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
