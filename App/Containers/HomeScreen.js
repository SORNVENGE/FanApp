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
  StatusBar,
  ScrollView,
  Platform,
  Linking
} from "react-native";
import { Icon } from "native-base";
import { Images, Colors, Metrics, Fonts } from "../Themes";
import { Actions } from "react-native-router-flux";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import Swiper from "react-native-swiper";
import { Rating } from "react-native-elements";
const GREEN = "rgba(141,196,63,1)";
const PURPLE = "rgba(108,48,237,1)";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import Loading from "../Components/Loading";
import I18n from './I18n';
import { connect } from 'react-redux'
import StoreUserInfoActions from '../Redux/StoreUserInfoRedux'
import firebase from "react-native-firebase";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusLoading: false,
      userData: props.tempUser ? props.tempUser : [],

      imageSlide: [
        {
          image: Images.one,
          location: "#169,Street 168, Toek Thla,Sen Sok"
        },
        {
          image: Images.two,
          location: "#169,Street 168, Toek Thla"
        },
        {
          image: Images.three,
          location: "169,Street 168"
        },
        {
          image: Images.four,
          location: "#169,Street 168,  Toul Kork"
        },
        {
          image: Images.five,
          location: "#169,Street 168, Phnom Penh"
        }
        // {
        // 	image: Images.six,
        // 	location: '#169,Street 168, BBK'
        // },
      ],
      category: [
        {
          title: 'my_class',
          name: "My Class",
          image: Images.glocery,
          iconName: "database",
          iconType: "FontAwesome5"
        },
        {
          title: 'facebook',
          name: "Facebook",
          image: Images.bakery,
          iconName: "facebook-square",
          iconType: "AntDesign"
        },
        {
          title: 'youtube',
          name: "Youtube",
          image: Images.bakery,
          iconName: "youtube",
          iconType: "AntDesign"
        },
        {
          title: 'admission',
          name: "Admission",
          image: Images.berverages,
          iconName: "leaf",
          iconType: "FontAwesome"
        },
        {
          title: 'tuition_fee',
          name: "Tuition Fee",
          image: Images.bakery,
          iconName: "graduation-cap",
          iconType: "FontAwesome"
        },
        {
          title: 'main_program',
          name: "Main Program",
          image: Images.glocery,
          iconName: "graduation-cap",
          iconType: "FontAwesome"
        },
        {

          title: "elearning",
          name: "E-Learning",
          image: Images.stationary,
          iconName: "leaf",
          iconType: "FontAwesome"
        },
        {
          title: 'nothing',
          name: "Nothing ",
          image: Images.glocery,
          iconName: "logout",
          iconType: "AntDesign"
        },
        {
          title: 'setting',
          name: "Setting",
          image: Images.flower,
          iconName: "setting",
          iconType: "AntDesign"
        },
      ],
      activeIndex: 1,
      locationShop: ""
    };
    // this.ref = firebase.firestore().collection('main_program');
  }
  handleOnEachMenuClick = (item, index) => {
    const { userData, statusLoading } = this.state;
    
    if (Actions.currentScene == "HomeScreen" && item.name == "My Class") {
      console.tron.log({ userDataMyClass: userData })
      if (userData.data == null) {
        Actions.LoginScreen({ fromScreen: "MyClassScreen" });
      } else {
        Actions.MyClassScreen();
      }
    }
    else if (Actions.currentScene == "HomeScreen" && item.name == "Facebook") {
      Linking.openURL('https://www.facebook.com/n/?OppiGamingg');
    }
    else if (Actions.currentScene == "HomeScreen" && item.name == "Youtube") {
      Linking.openURL( 'https://www.youtube.com/c/shroud' );
    }
    else if (Actions.currentScene == "HomeScreen" && item.name == "Admission") {
      Actions.AdmissionScreen();
    }
    else if (Actions.currentScene == "HomeScreen" && item.name == "Tuition Fee") {
      Actions.FeeScreen();
    } 
    else if (Actions.currentScene == "HomeScreen" && item.name == "E-Learning") {
      Actions.ELearningScreen();
    }
    else if (Actions.currentScene == "HomeScreen" && item.name == "Main Program") {
      Actions.MainProgramScreen();
    }
    else if (Actions.currentScene == "HomeScreen" && item.name == "Setting") {
      Actions.SettingScreen();
    }
  };
  renderMeunuOption = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.handleOnEachMenuClick(item, index)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "33.33%",
          height: height < 731.4285714285714 ? width / 2.8 : width / 3,
          // borderWidth: 0.5,
          borderTopWidth: index > 2 ? 0.2 : null,
          borderLeftWidth: 0.2,
          borderRightWidth: 0.2,
          borderBottomWidth: 0.2,
          borderColor: Colors.white,
          backgroundColor: "#054368"
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 7 }}>
            <Icon
              name={item.iconName}
              type={item.iconType}
              style={{ color: Colors.white, fontSize: 30, fontWeight: "bold" }}
            />
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "40%"
            }}
          >
            <Text
              style={{
                fontSize: Fonts.size.medium,
                paddingTop: Metrics.mainMargin,
                textAlign: "center",
                paddingBottom: 10,
                paddingHorizontal: 5,
                color: "white"
              }}
            >
              {I18n.t(item.title)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  componentWillMount = () => {
    // for create student_class
    // this.ref = firebase.firestore().collection('tbl_student_class');
    // var studentClassList=[
    //   {studentId:'2yfnMOwCWa7e2kJl3HAv',classId:'QhydONPA9nabFeAXWFmv',joinedDate:'21-09-2020'},
    // 	{studentId:'2yfnMOwCWa7e2kJl3HAv',classId:'IgQIGVFoJYYj53f6PH1G',joinedDate:'21-09-2020'},
    //   {studentId:'MilSAE130YV6kybnoldH',classId:'IgQIGVFoJYYj53f6PH1G',joinedDate:'21-09-2020'},
    // 	{studentId:'N4ZsjNd9lwfCUgwzrvbD',classId:'IgQIGVFoJYYj53f6PH1G',joinedDate:'21-09-2020'},
    // 	{studentId:'ZIYFV98aKCehMRyizr8f',classId:'IgQIGVFoJYYj53f6PH1G',joinedDate:'21-09-2020'},
    // 	{studentId:'N4ZsjNd9lwfCUgwzrvbD',classId:'QhydONPA9nabFeAXWFmv',joinedDate:'21-09-2020'},

    // ]
    // studentClassList.map((eachStudentClass,ind) => {
    // 	this.ref.add({
    // 		studentId: eachStudentClass.studentId,
    // 		classId: eachStudentClass.classId,
    // 		joinedDate:eachStudentClass.joinedDate,
    // 	}).then((querySnapshot) => {
    // 		var key = querySnapshot._documentPath._parts[1]
    // 		this.ref.doc(key).update({
    // 		key: key,
    //     });
    // 	}).catch((error) => {
    // 	});
    // })
    // for create class
    // this.ref = firebase.firestore().collection('tbl_class');
    // var classList=[
    // 	{classname:'Bikay Training 1',teacherId:' ',subjectId:'9P7B0OIoNPDbnnQm34fi',levelId:'ROWLqhpfHpfo4IQS0VHi',sessionId:'jM9QP8jpC1uOq8N8D3GD',status:"true",create_at:'21-09-2020'},
    // 	{classname:'Kosign Training 2',teacherId:' ',subjectId:'AjHlxFzKO0GqDfcJ3Aom',levelId:'eu8j1VJIxDSL1izugPtT',sessionId:'rUUFQORjGRSNbFsgnZPn',status:"true",create_at:'21-09-2020'},
    // 	{classname:'Norton Training 3',teacherId:' ',subjectId:'TTAqgjowXgZ0hWMAfb5d',levelId:'eu8j1VJIxDSL1izugPtT',sessionId:'rUUFQORjGRSNbFsgnZPn',status:"true",create_at:'21-09-2020'},
    // ]
    // classList.map((eachUser,ind) => {
    // 	this.ref.add({
    // 		classname: eachUser.classname,
    // 		teacherId: eachUser.teacherId,
    // 		subjectId: eachUser.subjectId,
    // 		levelId: eachUser.levelId,
    // 		sessionId: eachUser.sessionId,
    // 		status: eachUser.status,
    // 		create_at:eachUser.create_at,
    // 	}).then((querySnapshot) => {
    // 		var key = querySnapshot._documentPath._parts[1]
    // 		this.ref.doc(key).update({
    // 		key: key,
    //     });
    // 	}).catch((error) => {
    // 	});
    // })
    // for create user
    // this.ref = firebase.firestore().collection('tbl_user');
    // var userList=[
    // 	{username:'kongsun',phone:'01234551',password:'123456',roleId:'fI9YghorPDaLRqIoTnVT',status:"true",create_at:'21-09-2020'},
    // 	{username:'Chinhong',phone:'09877321',password:'123456',roleId:'fI9YghorPDaLRqIoTnVT',status:"true",create_at:'21-09-2020'},
    // 	{username:'Makara',phone:'012546203',password:'123456',roleId:'fI9YghorPDaLRqIoTnVT',status:"true",create_at:'21-09-2020'},
    // 	{username:'Sokchea',phone:'017949222',password:'123456',roleId:'fI9YghorPDaLRqIoTnVT',status:"true",create_at:'21-09-2020'},
    // 	{username:'Kimthong',phone:'086732232',password:'123456',roleId:'fI9YghorPDaLRqIoTnVT',status:"true",create_at:'21-09-2020'},
    // 	{username:'Veasna',phone:'09867833',password:'123456',roleId:'fI9YghorPDaLRqIoTnVT',status:"true",create_at:'21-09-2020'},
    // ]
    // userList.map((eachUser,ind) => {
    // 	this.ref.add({
    // 		username: eachUser.username,
    // 		phone: eachUser.phone,
    // 		password: eachUser.password,
    // 		roleId: eachUser.roleId,
    // 		status: eachUser.status,
    // 		create_at:eachUser.create_at,
    // 	}).then((querySnapshot) => {
    // 		var key = querySnapshot._documentPath._parts[1]
    // 		this.ref.doc(key).update({
    // 		key: key,
    //     });
    // 	}).catch((error) => {
    // 	});
    // })
    // for create level
    // this.ref = firebase.firestore().collection('tbl_level');
    // var levelList=[
    // 	{levelName:'Beginner',description:'we study at beginner',create_at:'21-09-2020'},
    // 	{levelName:'Intermedia',description:'we study at intermedia',create_at:'21-09-2020'},
    // 	{levelName:'Advance',description:'we study in advacne',create_at:'21-09-2020'},
    // ]
    // levelList.map((eachLevel,ind) => {
    // 	this.ref.add({
    // 		levelName: eachLevel.levelName,
    // 		description:eachLevel.description,
    // 		create_at:eachLevel.create_at,
    // 	}).then((querySnapshot) => {
    // 		var key = querySnapshot._documentPath._parts[1]
    // 		this.ref.doc(key).update({
    //         key: key
    //     });
    // 	}).catch((error) => {
    // 	});
    // })
    // for create session
    // this.ref = firebase.firestore().collection('tbl_session');
    // var sessionList=[
    // 	{sessionName:'Morning',description:'we study at the morning',create_at:'21-09-2020'},
    // 	{sessionName:'Afternoon',description:'we study at the afternoon',create_at:'21-09-2020'},
    // 	{sessionName:'Evening',description:'we study at the evening',create_at:'21-09-2020'},
    // ]
    // sessionList.map((eachSession,ind) => {
    // 	this.ref.add({
    // 		sessionName: eachSession.sessionName,
    // 		description:eachSession.description,
    // 		create_at:eachSession.create_at,
    // 	}).then((querySnapshot) => {
    // 		var key = querySnapshot._documentPath._parts[1]
    // 		this.ref.doc(key).update({
    //         key: key
    //     });
    // 	}).catch((error) => {
    // 	});
    // })
    // for create subject
    // this.ref = firebase.firestore().collection("tbl_subject");
    // var subjectList = [
    //   {
    //     subjectName: "Korean writng",
    //     description: "The subject is korean",
    //     create_at: "21-09-2020"
    //   },
    //   {
    //     subjectName: "Lao writing",
    //     description: "The subject is Lao writing",
    //     create_at: "21-09-2020"
    //   },
    //   {
    //     subjectName: "japen writing",
    //     description: "The subject is japen writing",
    //     create_at: "21-09-2020"
    //   }
    // ];
    // subjectList.map((eachSubject, ind) => {
    //   this.ref
    //     .add({
    //       subjectName: eachSubject.subjectName,
    //       description: eachSubject.description,
    //       create_at: eachSubject.create_at
    //     })
    //     .then(querySnapshot => {
    //       var key = querySnapshot._documentPath._parts[1];
    //       this.ref.doc(key).update({
    //         key: key
    //       });
    //     })
    //     .catch(error => {});
    // });
    // for create role
    // this.ref = firebase.firestore().collection('tbl_role');
    // var studentList=[
    // 	{role:'Student',description:'He is a Student',create_at:'21-09-2020'},
    // 	{role:'Teacher',description:'He is a Teacher',create_at:'21-09-2020'},
    // 	{role:'Admin',description:'He is an Admin',create_at:'21-09-2020'},
    // ]
    // studentList.map((eachStudent,ind) => {
    // 	this.ref.add({
    // 		roleName: eachStudent.role,
    // 		description:eachStudent.description,
    // 		create_at:eachStudent.create_at,
    // 	}).then((querySnapshot) => {
    // 		var key = querySnapshot._documentPath._parts[1]
    // 		this.ref.doc(key).update({
    //         key: key
    //     });
    // 	}).catch((error) => {
    // 	});
    // })
    // create main program table
    // var programList = [
    // 	{ ProgramTitle: 'I. ចំណេះទូទៅ(ថ្នាក់ទី​១​-១២)',des:"it is for sample data",color: "#00A99D",image:'Images.eachimage1' },
    // 	{ ProgramTitle: 'II. ភាសាអង់គ្លេសទូទៅ(​ថ្នាក់ត្រៀម​, កម្រិត១-១២)',des:"it is for sample data" ,color: "#00A99D",image:'Images.eachimage2' },
    // 	{ ProgramTitle: 'III. កម្មវិធីគណនាលេខរហ័ស IMA',des:"it is for sample data" ,color: "#00A99D",image:'Images.eachimage3' },
    // 	{ ProgramTitle: 'IV. វគ្គបណ្ដុះបណ្ដាលកុំព្យូទ័រ',des:"it is for sample data" ,color: "#00A99D",image:'Images.eachimage4' },
    // 	{ ProgramTitle: 'V. ថ្នាក់ត្រៀមប្រឡងតេស្ដអន្តរជាតិ',des:"it is for sample data" ,color: "#00A99D",image:'Images.eachimage5' },
    // ];
    // programList.map((eachProgram,ind) => {
    // 	this.ref.add({
    // 		id:ind+1,
    // 		title: eachProgram.ProgramTitle,
    // 		color:eachProgram.color,
    // 		des:eachProgram.des,
    // 		image:eachProgram.image,
    // 	}).then((data) => {
    // 	}).catch((error) => {
    // 	});
    // })
  };

  render() {
    if (this.props.getLanguage.value) {
			I18n.locale = this.props.getLanguage.value;
		} else {
			I18n.locale = "en"
		}
    const { imageSlide, statusLoading } = this.state;
    if (statusLoading) return <Loading />;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.main_color }}>
        <ScrollView>
          <View style={{ backgroundColor: Colors.white }}>
            <View style={{}}>
              <Swiper
                loop={true}
                autoplay={true}
                style={{ height: 300 }}
                // style={{ height: Metrics.width / 1.6 }}
                dot={<View />}
                activeDot={<View />}
              >
                {imageSlide.map((eachImage, index) => {
                  return (
                    <View style={styles.item}>
                      <Image source={eachImage.image} style={styles.item} />
                    </View>
                  );
                })}
              </Swiper>
            </View>

            <FlatList
              data={this.state.category}
              numColumns={3}
              renderItem={this.renderMeunuOption}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    height: "100%",
    borderRadius: Metrics.buttonRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    borderRadius: 8
  },
  image: {
    resizeMode: "cover"
    // resizeMode: 'contain'
  }
});

const mapStateToProps = (state) => {
  return {
    tempUser: state.tempUser,
		getLanguage: state.language,

  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    requestClearUserStoreInfo: () => dispatch(StoreUserInfoActions.clearUserInfoRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
