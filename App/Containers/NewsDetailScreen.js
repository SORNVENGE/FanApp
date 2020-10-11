import React,{Component} from 'react';
import {View,Text,ScrollView,} from 'react-native';
import Loading from '../Components/Loading'

export default class NewsDetailScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            statusLoading:true,
            content:props.item.content
        }
    }

    componentWillMount = () => {
        setTimeout(() => {
            this.setState({statusLoading: false})
        }, 1500)
    }

    render(){
        const {content,statusLoading}=this.state
        if (statusLoading) return <Loading />

        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={{ justifyContent: 'center', padding: 10 }}>
                        <Text style={{ fontSize: 15, paddingTop: 10,paddingLeft:10,lineHeight:24 }}>
                            {content}
                        </Text>
                    </View>
               </ScrollView>
            </View>
        );
    }
}