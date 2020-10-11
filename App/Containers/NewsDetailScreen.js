import React,{Component} from 'react';
import {View,Text,ScrollView,} from 'react-native';
import Loading from '../Components/Loading'

export default class NewsDetailScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            statusLoading:true,
            description:props.item.description
        }
    }

    componentWillMount = () => {
        setTimeout(() => {
            this.setState({statusLoading: false})
        }, 1500)
    }

    render(){
        const {description,statusLoading}=this.state
        if (statusLoading) return <Loading />

        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={{ justifyContent: 'center', padding: 10 }}>
                        <Text style={{ fontSize: 15, paddingTop: 10,paddingLeft:10,lineHeight:24 }}>
                            {description}
                        </Text>
                    </View>
               </ScrollView>
            </View>
        );
    }
}