import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import Loading from '../Components/Loading'
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import { Actions } from 'react-native-router-flux';

export default class NewsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLoading: true,
            newsData: [],
            newsList: [
                { title: 'Fan school has open new with good promotion', image: "https://www.iconfinder.com/data/icons/ballicons-reloaded-free/512/icon-70-512.png", description: "MAIN NEWS invites students to explore the day’s international, national and local stories offering current and challenging information about people, places and events in the news.The diversity of the MAIN NEWS section makes it ideal for supporting and responding to many areas within the school curriculum. The language arts components are obvious: reading articles and advertising, responding to the reading through writing, discussing readings and writings. The national and world-wide scope of MAIN NEWS articles also offer a rich resource for reinforcing the study of civics, politics, world cultures and geography. Real-life applications of mathematics concepts and strategies can be created using the advertising, the Economy & Business news, even the datelines. Science connections abound in the Environment page in Monday’s newspaper.The exercises developed around the MAIN NEWS section have students work with and respond to science news, news abstracts, pictures and illustrations, editorial commentary, federal government activity, reporters’ journals and advertising.Some learners may be ready to respond to one or more of the various levels of exercises developed around these MAIN NEWS features. However, the success of other students may depend upon a careful introduction to the concepts and issues characterizing this section of the paper. For these students, it will be important to create a concept and vocabulary base to assist in their comprehension of and response to MAIN NEWS. Given time to browse through the section, students’ understanding of MAIN NEWS would benefit from a discussion prompted", date: "10/10/2020" },
                { title: 'Time to promotion with Fan school ', image: "https://www.iconfinder.com/data/icons/gradient-5/50/436-512.png", description: "Draw students’ attention to the photographs within MAIN NEWS. Students will be asked to respond to these photographs that enhance news stories in ways which promote their own vocabulary development, comprehension and writing skills.Students will need to scan MAIN NEWS and review the photographs in that section to perform the following exercises. Students will need scissors, tape, glue and paper. This exercise may be done individually or in groups.Mount a picture on the chalkboard or on large chart paper or display a picture on your interactive white board from e-Replica. The picture should be selected from an edition of the newspaper NOT being used by students for this exercise. Have students list five words or phrases that describe the emotions expressed in the picture. Ask students to select one word from their lists. After sharing the word, each student is to tell what in the picture elicits this emotion. Are students’ emotions similar?Note: This exercise can be modified by using the METRO section, OR Thursday’s Local Living Section.For further study of the photographs used in The Washington Post, go to", date: "09/10/2020" },
                { title: 'Study with Fan School will imrpove your english skill', image: "https://comps.canstockphoto.com/circle-icon-newspaper-illustration_csp47039028.jpg", description: "Have students locate THE FED PAGE, using the Table of Contents in e-Replica. You may need to explain that THE FED PAGE follows noteworthy events involving all branches and departments of the federal government from congressional committees to new federal regulations and government agencies.The Level 2 exercise should be used as a preparation for the Level 3 exercise. These exercises can be done individually or in groups.1.  Divide students into six groups, each group representing a particular profession. Here are a few possible professions from which to select:Clergy, grocery store owners, doctors/nurses, military officers, educators, park employees, farmers, politiciansEach group will follow THE FED PAGE for one week, noting those activities within the federal government which relate to or have the potential for impacting upon their profession. At the end of the week, a group leader can present a summary report of the group’s findings. Each group member can support the report with details of some of the most interesting federal activities related to their professions.Note: Teachers may wish to save THE FED PAGE from one or more weeks. Make a list of professions based upon those that appear in the collection. Groups will select from this list of professions.2.  Have students consider this situation: You have been asked by the President to submit a report on issues facing the federal government. Over a one-week period, follow THE FED PAGE and summarize each article. Choose three issues that you believe require the President’s immediate attention and explain why.3.  From his or her list of three issues compiled in the previous exercise, each student will choose one. Based upon THE FED PAGE reports, what action does the student recommend? Prepare a two-paragraph statement. In the first paragraph summarize the issue. In the second paragraph explain why this issue requires immediate attention.After the experience of preparing a two-paragraph brief, students may be asked to write a longer report to elaborate on their findings and to provide persuasive arguments for their recommendation.Find other related articles. Based on the information gleaned from THE FED PAGE and other related articles, will the student keep or modify his or her original recommendation?Why? Each student will produce a report recommending what action the President should take on this issue.", date: "09/10/2020" },
                { title: 'OutStanding student from Fan School will display next week', image: "https://www.bsa-cuesports.com/wp-content/uploads/2014/07/news-icon.jpg", description: "Have students locate the OP-ED PAGE, using the Table of Contents on e-Replica. You may wish to lead a discussion on the differences between fact and opinion as an introduction to this exercise. The newspaper has a duty to inform its community. Why is it important to provide readers a voice through LETTERS TO THE EDITOR?Ask students if they write letters to anyone? A thank you note after receiving a gift or a letter to a relative to express affection might be familiar to them. Do they use e-mail to send notes? Why do they send notes or write letters? Distinguish informal notes from formal letters.Note: LETTERS TO THE EDITOR exercises can be modified for use with other sections of The Washington Post that offer a Letters to the Editor column.2.  Encourage students to exchange opinions about an issue dealt with in one or more editorials or LETTERS TO THE EDITOR. Assist students in conducting a classroom survey to determine the positions taken relative to the issue. Consider adding demographic elements to the collection of survey information (boys vs. girls, those who live less than a mile from school vs. those who live more than a mile from school, those who use public facilities vs. those who go to private clubs or home facilities for sports activities). Using bar graphs or picture graphs, students can work in pairs or small groups to create visuals depicting the results of the poll.3.  Have students read the LETTERS TO THE EDITOR for a week. Students will choose one letter of interest to them and research the original editorial, column or article to which the letter responds. Have students consider the strengths and weaknesses of the letter writer’s arguments and, based upon the analysis, have students write a new Letter to the Editor or create an editorial cartoon supporting or rebutting the position of the original letter.", date: "08/10/2020" },
            ]
        }
    }
    componentWillMount = () => {
        setTimeout(() => {
            this.setState({statusLoading: false})
        }, 1500)
    }

    render() {
        const { statusLoading,newsList } = this.state
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>


                    {newsList.map((eachData, index) => {
                        return (
                            <View style={{ padding: 10, flexDirection: 'column' }}>
                                <TouchableOpacity onPress={() => Actions.NewsDetailScreen({ item: eachData })} style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={{ width: '30%', justifyContent: 'center' }}>
                                        <Image source={{ uri: eachData.image }} style={{ width: 80, height: 80, alignSelf: 'center' }} />
                                    </View>
                                    <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{eachData.title}</Text>
                                        </View>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 14, color: 'black' }}>{eachData.date}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: 'grey', borderWidth: 0.2, marginLeft: "30%", marginTop: 5 }}></View>
                            </View>

                        );
                    })}


                </ScrollView>

            </View>
        );
    }
}