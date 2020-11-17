import React,{Component} from 'react';
import {View,Text,ScrollView,Image} from 'react-native';
import Loading from '../Components/Loading'

export default class NewsDetailScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            statusLoading:true,
            content:props.item.content,
            filePath:props.item.filePath,
        }
    }

    componentWillMount = () => {
        setTimeout(() => {
            this.setState({statusLoading: false})
        }, 1500)
    }

    render(){
        const {content,statusLoading,filePath}=this.state
        if (statusLoading) return <Loading />

        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={{ justifyContent: 'center', padding: 10 }}>
                       
                            <View style={{ width: '100%', justifyContent: 'center' }}>
                                <Image source={{ uri: "http://172.16.4.80:3000"+filePath }} style={{ width: '90%', height: 250, alignSelf: 'center' }} />
                            <View>
                            </View>  
                            <Text style={{ fontSize: 15, paddingTop: 10,paddingLeft:10,lineHeight:24 }}>
                                  {content}
                             </Text>
                           </View>
                       
                        
                    </View>
               </ScrollView>
            </View>
        );
    }
}