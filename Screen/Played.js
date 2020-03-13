import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Alert, Text,Image,TouchableOpacity,ToastAndroid,AsyncStorage,TextInput } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import {Left,Right} from "native-base"
import axios from 'axios'
import Icon1 from "react-native-vector-icons/AntDesign"
// import KalturaPlayer  from 'react-native-kaltura'
import Video from 'react-native-af-video-player'
import Comments from "./Comments"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
    justifyContent:"center"
    
  }
})

export default class Played extends Component {
  constructor(props) {
        super(props);
        this.state = {
          comment:false,
          like:false,
          GetLike:'',
          GetUnlike:'',
          show:true,
          AppTokenKs:null,
          // UpdateLikeAndUnlike:this.props.navigation.getParam('Detail', "NotFound"),
          Detail:this.props.navigation.getParam('Detail', "NotFound"),
          LiveUrl:this.props.navigation.getParam('LiveStream', "NotFound"),
          VideoUrl:this.props.navigation.getParam('VideoUrl', "NotFound")

        };
      }
      async componentWillMount(){
        console.log("Check Detail For Show Like",this.state.Detail)
        let AppTokenKs = '';
        try {
          AppTokenKs = await AsyncStorage.getItem('AppTokenks') || 'none';
          this.setState({AppTokenKs:JSON.parse(AppTokenKs)})
          console.log("App TOken KS in Video ",this.state.AppTokenKs)
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      //  this.GetPremiumVideo()
      this.ListingLikes();

      }
  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status
    })
  }

  onMorePress() {
    Alert.alert(
      'Work in Progress',
      'This is an action call!',
      [{ text: 'Happy!' }]
    )
  }
  ListingLikes  = ()=>{
    console.log("App Token Ks in GetPremiumVideo Function",this.state.AppTokenKs)
    axios.get(`http://stats.baselinux.net/comments/listLikes?ks=${this.state.AppTokenKs}&entryId=${this.state.Detail.id}`)
    .then( (response)=> {
      console.log("Like Lists Video",response)
      let like=response.data.result[0].likes;
      let unlike=response.data.result[0].unlikes;
      console.log("Likes and Unlikes",like +"''''"+unlike)
      this.setState({
        GetLike:like,
        GetUnlike:unlike
      })
    }).catch((error)=>{
      console.log("Likke Video  Error",error)
  })
  }
  LikeVideo = ()=>{
    console.log("App Token Ks in GetPremiumVideo Function",this.state.AppTokenKs)
    axios.get(`http://stats.baselinux.net/comments/like?ks=${this.state.AppTokenKs}&entryId=${this.state.Detail.id}`)
    .then( (response)=> {
      console.log("Like Video Suceess",response)
      ToastAndroid.show('Liked', ToastAndroid.SHORT);
      this.ListingLikes();
    }).catch((error)=>{
      console.log("Likke Video  Error",error)
  })
  }
  UNLikeVideo = ()=>{
    console.log("App Token Ks in GetPremiumVideo Function",this.state.AppTokenKs)
    axios.get(`http://stats.baselinux.net/comments/unlike?ks=${this.state.AppTokenKs}&entryId=${this.state.Detail.id}`)
    .then( (response)=> {
      console.log("UnLikee Video Suceess",response)
      this.ListingLikes();
      ToastAndroid.show('Unliked', ToastAndroid.SHORT);
    }).catch((error)=>{
      console.log("UnLikke Video  Error",error)
  })
  }

  render() {
    const url = 'https://vjs.zencdn.net/v/oceans.mp4'
    const logo = 'https://your-url.com/logo.png'
    const placeholder = 'https://your-url.com/placeholder.png'
    const title = this.state.Detail.name
    // console.log("This is the detail of video",this.state.Detail)
console.log("In the video screen ",this.state.VideoUrl)
    return (
      <View style={styles.container}>
        <Video
          autoPlay
          url={this.state.VideoUrl==="NotFound"?this.state.LiveUrl:this.state.VideoUrl}
          title={title}
          // height={500}
          style={{width:"100%",height:200}}
          logo={logo}
          placeholder={placeholder}
          onMorePress={() => this.onMorePress()}
          onFullScreen={status => this.onFullScreen(status)}
          rotateToFullScreen
          // fullScreenOnly
        />
         <View style={{flexDirection:"row"}}>
           <Left>
           <Text style={{fontSize:18,color:"black",fontWeight:"bold",marginLeft:10,marginTop:5,marginBottom:5}}>{this.state.Detail.name}</Text>

<View style={{flsexDirection:"row",marginLeft:10,marginBottom:5,flexDirection:"row"}}>
<Image source={{uri:this.state.Detail.thumbnailUrl}} style={{width:50,height:50,borderRadius:25}}/>
<Text style={{fontSize:18,color:"black",fontWeight:"bold",marginTop:8,marginLeft:10}}>{this.state.Detail.userId}</Text>
          </View>
           </Left>

    <Right style={{marginRight:5,marginBottom:10,flexDirection:"row",justifyContent:"flex-end"}}>
  <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={this.LikeVideo}>
  <Icon1 name="like2"  size={20} style={{marginLeft:5,color:this.state.GetLike ===1 ? "#EE5A4E":"grey"}} />
  </TouchableOpacity>
<Text style={{marginLeft:2,marginRight:10}}>({this.state.GetLike})</Text>
  </View>
  <View style={{flexDirection:"row",marginTop:2}}>
    <TouchableOpacity onPress={this.UNLikeVideo}>
  <Icon1 name="dislike2"  size={20} style={{marginLeft:5,color:this.state.GetUnlike ===1 ? "#EE5A4E":"grey"}} />
  </TouchableOpacity>
<Text style={{marginLeft:2,marginRight:10}}>({this.state.GetUnlike})</Text>
  </View>
</Right>
  </View>
        <Comments tokenId={this.state.Detail} />
      </View>
    )
  }
}