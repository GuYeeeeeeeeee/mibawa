import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, Text,Image,Keyboard,TouchableOpacity,FlatList,TextInput,AsyncStorage,TouchableWithoutFeedback } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import {Left,Right, Fab} from "native-base"
import Icon1 from "react-native-vector-icons/AntDesign"
import axios from 'axios'
import SingleComments from './SingleComments'
class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
        show:true,
        comment:null,
        AppTokenKs:null,
        CommentData:[]
    };
  }
  async componentWillMount(){
    let AppTokenKs = '';
    try {
      AppTokenKs = await AsyncStorage.getItem('AppTokenks') || 'none';
      this.setState({AppTokenKs:AppTokenKs})
      console.log("App TOken KS in Comment ",this.state.AppTokenKs)
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  this.GetComment();
  }
  PostComment =()=>{
    new Promise((resolve, reject) => {
      const frameListener = Keyboard.addListener('keyboardWillChangeFrame', () => {
        frameListener.remove()
        didListener.remove()
        resolve()
      })
    
      const didListener = Keyboard.addListener('keyboardDidHide', () => {
        frameListener.remove()
        didListener.remove()
        resolve()
      })
    
      Keyboard.dismiss()
    })
    axios.get(`http://stats.baselinux.net/comments/post?ks=${this.state.AppTokenKs}&entryId=${this.props.tokenId.id}&comment=${this.state.comment}`)
    .then( (response)=> {
      console.log("Comment Post Success",response)
     this.GetComment();
    }).catch((error)=>{
      console.log("Comment Post Error",error)
  })
  }
  GetComment =()=>{
    axios.get(`http://stats.baselinux.net/comments/list?ks=${this.state.AppTokenKs}&entryId=${this.props.tokenId.id}&rows=9&fromIndex=0`)
    .then( (response)=> {
      console.log("Get COmments Success",response)
      let comment = response.data.result
      // let CommentData = response
      console.log("check comment",comment)
      const peopleArray = Object.keys(comment).map(i => comment[i])
      this.setState({
        CommentData:peopleArray
      })  
      // this.setState({ CommentData: [...comment] })
      console.log("Check The State For Comments",this.state.CommentData)
    }).catch((error)=>{
      console.log(" Get Comment  Error",error)
  })
  }

  render() {
    return (
        <View style={{flex:1}}>
        <ScrollView keyboardShouldPersistTaps={true}>  
   {/* <View style={{width:"100%",height:45,backgroundColor:"#E0E0E0",flexDirection:"row",justifyContent:"space-around"}}>
   <TouchableOpacity
   onPress={()=>{
     this.setState({comment:true})
   }}
   >
     <Left style={{flexDirection:"row",marginTop:5}}>
<Text style={{marginLeft:10,marginTop:10,fontSize:16}}>Comments (6)</Text>
<Icon name="angle-down" size={22} style={{marginLeft:5,marginTop:10,color:this.state.comment ? "#EE5A4E":"grey"}} />
</Left>
</TouchableOpacity>
     </View>    */}
 <SingleComments commentData={this.state.CommentData} tokenId={this.props.tokenId.id} />
       </ScrollView>
       {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
<View style={{flexDirection:"row"}}>
 <TouchableOpacity onPress={()=>this.setState({
   show:false
 })}
>
 <TextInput
 placeholder="Comment Here"
 onChangeText={(comment) => this.setState({comment})}
 underlineColorAndroid="grey"
 width={300}
 style={{marginLeft:20}}
 />
 </TouchableOpacity>
 <TouchableOpacity
 onPress={this.PostComment}
 >
 <Icon name="send" size={20} color="black" style={{marginTop:15,marginLeft:10}}/>
 </TouchableOpacity>
</View>
{/* </TouchableWithoutFeedback> */}
</View>

   );
  }
}

export default Comments;
