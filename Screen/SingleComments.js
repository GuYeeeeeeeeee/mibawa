import React, { Component } from 'react';
import { StyleSheet, View, ScrollView,AsyncStorage,Dimensions, Alert,ToastAndroid,KeyboardAvoidingView, Text,Image,TouchableOpacity,FlatList,TextInput } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import {Left,Right, Fab} from "native-base"
import axios from 'axios'
import Modal from 'react-native-modal'
import Icon1 from "react-native-vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/Octicons"
const screenWidth = Math.round(Dimensions.get('window').width);
class SingleComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
        show:true,
        ReplyCommentModal:false,
        commentData:[],
        id:'',
        Reply:''
    };
  }
  getData = (id) =>{
    this.setState({id:id})
// console.log("Specific id  FOr Reply",id)
    this.setState({ReplyCommentModal:true})
  }
  PostComment = async (id)=>{
    let AppTokenKs=null;
    AppTokenKs = await AsyncStorage.getItem('AppTokenks') || 'none';
console.log("Specific id  FOr Reply",this.state.id)  
console.log("Ks FOr Reply",AppTokenKs)
    console.log("Here is id for comment reply",this.state.id)
    axios.get(`http://stats.baselinux.net/comments/reply?ks=${AppTokenKs}&replyCommentRef=${this.state.id}&entryId=${this.props.tokenId}&comment=${this.state.Reply}`)
    .then( (response)=> {
      console.log("Reply Comments",response)
      let message= response.data.result.status
ToastAndroid.show(message, ToastAndroid.SHORT);
    }).catch((error)=>{
      console.log(" Reply Comment  Error",error)
  })
  this.setState({ReplyCommentModal:!this.state.ReplyCommentModal})
  }
  
  render() {
    return (
   <View style={{backgroundColor:"white",width:"100%",height:"70%"}}>
     {/* {console.log("Here in Comments UI",this.props.commentData)} */}
   <FlatList
        data={this.props.commentData}
        contentContainerStyle={{ paddingBottom: 80}}
        renderItem={({ item }) => (
            <View style={{flexDirection:"row",width:"100%",backgroundColor:"white",height:80,alignItems:"center",justifyContent:"center"}}>
      <Image  source={require('../Imges/2.jpg')} style={{width:50,height:50,borderWidth:2,borderColor:"grey",borderRadius:15}} />
      <View style={{marginLeft:10,marginTop:0}}>
        <Text style={{fontSize:16,color:"black",marginTop:10,fontWeight:"bold"}}>{item.name}</Text>
        <View>
        <Text>{item.comment}</Text>
        <View style={{flexDirection:"row",marginLeft:15}}>
          <View style={{flexDirection:"row"}}>
          <Icon1 name="clockcircleo" style={{marginTop:3,marginRight:5}} />
        <Text>{item.time}</Text>
        <TouchableOpacity onPress={()=>this.getData(item.replyCommentRef)}>
        <Icon2 name='comment-discussion' size={16} style={{marginLeft:20,marginTop:3,color:'black'}}/>
        </TouchableOpacity>
        </View>
        
        </View>
        <View>
        </View>
        </View>
      </View>
      
    </View>
        )}
      />
    <Modal isVisible={this.state.ReplyCommentModal} onBackdropPress={()=>this.setState({ReplyCommentModal:false})}>
   <View style={{backgroundColor:"white",width:screenWidth,height:50,position:'absolute',bottom:0}}>
   <View style={{width:'90%',height:30,flexDirection:'row'}}>
       <TextInput
           underlineColorAndroid="grey"
           style={{backgroundColor:"white",width:'80%',height:50,marginLeft:5}}
           placeholderTextColor="grey"
           placeholder="Reply Here"
           value={this.state.text}
           onChangeText={(Reply) => this.setState({ Reply })}
      />
      <TouchableOpacity onPress={this.PostComment}>
       <Icon name="send" size={20} color="black" style={{marginLeft:20,marginTop:10}}/>
       </TouchableOpacity>
      </View>
   </View>
 </Modal>

   </View>  
   );
  }
}

export default SingleComments;
