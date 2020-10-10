import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Actions } from 'react-native-router-flux';
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import Loading from '../Components/Loading'
export default class MainProgramScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainProgramData: [],
            statusLoading: false,
            mainData :[
                { title: 'I. ចំណេះទូទៅ(ថ្នាក់ទី​១​-១២)', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcStIVmje-5YIdLKCsMGiwBmphMVvqDWsDjiLRVm6nELHesjU0-u&usqp=CAU", description: "MY SCHOOL PARAGRAPH 2 (150 WORDS) My school is ten kilometers away from my home, and I go by the school bus every morning. I love to go to school. I learn so many new things at school every day. There are many different subjects I study at school. I study languages like Sanskrit, Hindi and English, and other subjects like mathematics, science and social studies.My school is very beautiful. There are nice, lush gardens with beautiful plants and trees. In spring time the blooming flowers are a spectacle. My school has a well equipped library, and I enjoy reading books. There are also computers in the school for our use.I love my school and my teachers. My teachers are very caring. They teach us with a great deal of patience, and they want us to become good and responsible human beings. I want to make my school and my teachers proud of me.MY SCHOOL PARAGRAPH 3 (200 WORDS)I love to go to school. When I have a holiday I miss school. I go to school with my friends, and we enjoy biking down together. My school is two kilometers away from home. I wake up early in the morning to go to school as classes begin at quarter past seven every day.I find my school uniform very smart. The uniform is a white shirt and a blue skirt with a black belt and blue tie. And to go with it is a pair of white socks and black shoes. The teachers are strict about our uniform being neat and spotlessly clean. At the assembly the students, all together, look very neat and well turned out.At school I learn many new things each day. There are many subjects that are taught to us like languages, mathematics, science and social studies. We also have interesting co-curricular activities that help us learn better. We also go on educative excursions.There are a number of extra-curricular activities also that are offered to us. We are afforded opportunities to participate in various sports, music, dance, theatre and art events. These are fun activities that also help us develop our hobbies.", color: "#00A99D" },
                { title: 'II. ភាសាអង់គ្លេសទូទៅ(​ថ្នាក់ត្រៀម​, កម្រិត១-១២)', image: "https://edukasyon-production.s3.amazonaws.com/uploads/school/avatar/6214/San_Mateo_Vocational_and_Industrial_High_School.jpg", description: "My school is my pride. It is so because at my school I learn so many things. I meet enlightened teachers who impart to me the light of knowledge and thus illumine my world which would remain dark. I also meet my friends in the form of our classmates who make my world colourful and vibrant with their friendship and cooperation.  At school I get the exposure to participate in various academic, co-curricular and extra-curricular activities which hone my personality. I get all round training at school. My time just flies at school. The school years pass at a fast pace doing meaningful and skill development activities.  My school has reputation as one of the most premier educational institutes in the city. I feel proud of its various achievements.  In conclusion I can say that school indeed is my pride where I spend maximum of my time in the company of parents-like teachers and siblings-like peers. I just love my school. It is at school that I learn so much. I learn so many different subjects. There are many interesting co-curricular activities too. I also participate in extra-curricular activities like music, dance, art, craft and plays. I also get the opportunity to take part in sports and games on the sports grounds at school. I am part of the school’s volleyball team. Our teachers teach us with a great deal of care and patience, and I am very grateful to the teachers. At school I have many good friends. We study, play and eat together. I love my school very much.", color: "#00A99D" },
                { title: 'III. កម្មវិធីគណនាលេខរហ័ស IMA', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXZIZei6MjRKX2CazWtQuY721ADFJLelcJ4w&usqp=CAU", description: "School is a place where one starts the journey of learning. It is a place to assimilate and accumulate knowledge and use it productively to become capable and equipped enough to work, to be good citizen and to become a good human.My school is Grand City Public School.  it is five kilometers away from my home. I daily go to my school by bus.I wake up early in the morning, take breakfast and pack my books in bag and rush to school. When I enter in my school I pray to God to increase in my knowledge. As I daily go there with the intention of learning something new.I always try to reach in assembly, where all students of the school belonging to different classes stand in rows active and alert.Sometimes I participate in assembly rituals. Our teachers suggest us different topics to present in assembly. I never hesitate to present formal speech on different topics in assembly.Our teachers inspire and encourage us to come forward and to become bold enough to speak fluently in front of teachers and students.The uniform of my school is very smart. It has white shirt and blue paint with a blue tie bearing the monogram of our school.Early in the morning at the time of assembly the uniform of all students is checked. The teachers punish us if our uniform is dirty.We keep our uniform neat and spotlessly clean. When all students stand in assembly they all look same and United.My school is very big, it has many classrooms. There is a play ground and a big library. There are science and computer labs in my school where we are taught to have practical work.", color: "#00A99D" },
                { title: 'IV. វគ្គបណ្ដុះបណ្ដាលកុំព្យូទ័រ', image: "https://mbio.asm.org/content/mbio/7/6/e01902-16/F1.large.jpg", description: "School is the most sacred place on the mother earth. It is a place where one get education and is trained to face the world. I study oxford kindergarten school Delhi. My school is very big.  It is the  two storied building with thirty classrooms.In my school there are about 1200 students. It provide education from KG and Nursery to 5th class. Our campus is called junior Oxford kindergarten branch. Near to our branch there is senior branch of school where from 6th to 10th class education is given.In my school there is a big ground where we all gather for assembly daily early in the morning. Our teachers are very affectionate, caring and kind.Our teachers not only teach us books but they teach us to obey parents,respect elders and to be a good citizen. I have many friends at school.  Most of them are my classmates. I play and lunch with them during break time.Our sports teacher entertains us and teach us how to play outdoor games. He encourages us to participate in games as the good source of exercise and fitness.Apart from it there is a computer lab where our computer teachers teach us how to use computer and work on it.There is a large green garden in our campus.It is full of colorful flowers and green plants. My school is the best school in whole city because we all live in school like a family. We help and support one another in hard times.", color: "#00A99D" },
                { title: 'V. ថ្នាក់ត្រៀមប្រឡងតេស្ដអន្តរជាតិ', image: "https://i.pinimg.com/originals/90/7a/03/907a03fc24cbb080ae2e33323bbeb3e5.png", description: "School is the holy place where one get education and learns the skills necessary for success. Knowledge is the power, that very power is bestowed at office.I study in county Cambridge school Delhi. It is very big and is famous in whole city. There are more than 30 teachers in my school. All teachers are very competent and experienced.There is best teaching faculty in my school. All teachers teach very well. I understand all subjects well and have developed interest in those subjects which were hard to me.I didn’t like mathematics earlier but since my admission here I have developed interest in mathematics because our mathematics teachers made me curious and motivated me to learn it.Now I can solve all types of sums. I study in class 8th. In my class there are 25 students. We all help one another in studies. The extraordinary students help dull and weak students.We are taught several subjects at our school.  For each subject there are special teachers for every grade. All teachers of my school are very hardworking.Along with curricular activities, our teachers organize extra-curricular activities like sports days, debates and quiz competitions to boost our potential.All teachers treat students equally.  They never discriminate among rich and poor students.  All students are equal in their eyes.Teachers play an important role in the betterment of school.  In my school all appointed teachers are very kind and cooperative.In our campus there are fully furnished classrooms. A fully air-conditioned large library where all types of books are present. The library is very big.  It can accommodate more than 200 students at a time.To entertain and facilitate kids there is a large playground where children play happily. There are science labs in my school where science teachers teach practically.", color: "#00A99D" },
            ]
        }
    }
    componentWillMount = () => {
        this.setState({ statusLoading: true });
        CloudFireStoreUserHelper.readMainProgram((response) => {
            if (response) {
                this.setState({ mainProgramData: response, statusLoading: false });
            }
            else {
                this.setState({ statusLoading: false });
            }
        })
    }

    render() {
        const { statusLoading, mainProgramData,mainData } = this.state
        if (statusLoading) return <Loading />

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {mainData.map((eachData, index) => {
                        return (
                            <TouchableOpacity onPress={() => Actions.MainProgramDetailScreen({ item: eachData })} style={{ padding: 10, flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={{ width: '30%', justifyContent: 'center' }}>
                                        <Image
                                            style={{ width: 85, height: 75, alignSelf: 'center', resizeMode: 'center' }}
                                            source={{ uri: eachData.image }}
                                        />

                                    </View>
                                    <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{eachData.title}</Text>
                                        </View>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 14, color: 'black' }}>05/06/2020 11AM</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: 'grey', borderWidth: 0.2, marginLeft: "30%", marginTop: 5 }}></View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

            </View>
        );
    }
}