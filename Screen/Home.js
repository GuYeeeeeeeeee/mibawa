import React, { Component } from 'react';
import { View, Text,ScrollView,Image,ImageBackground,TouchableOpacity,Platform,StatusBar,AsyncStorage, ListView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Left,Right,Body} from "native-base"
import Animated from "react-native-reanimated"
import axios from 'axios'
import RecentlyPlayed from './RecentlyPlayed';
import RecommendedVideos from './RecommendedVideos'
import Header from './Header'
const Header_Height =Platform.OS == "ios" ?115:60;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AppTokenKs:'',
      LiveData:null,
      CategoriesData:null
    };
  }
  GetLiveContent =()=>{
    console.log("App Token Ks in GetLiveContent Function",this.state.AppTokenKs)
    axios.get(`http://cdn1.baselinux.net/api_v3/service/media/action/list?ks=${this.state.AppTokenKs}&filter[objectType]=KalturaMediaEntryFilter&pager[objectType]=KalturaFilterPager&format=1&filter[mediaTypeEqual]=201`)
    .then( (response)=> {
      console.log("Live Content Session Success",response)
      let obj = response.data.objects 
      this.setState({
        LiveData:obj
      })
      console.log("In Live content function ",this.state.LiveData)

    }).catch((error)=>{
      console.log("Live Content Session Error",error)
  })
  }
  GetCategoriesContent =()=>{
    console.log("App Token Ks in GetLiveContent Function",this.state.AppTokenKs)
    axios.get(`http://cdn1.baselinux.net/api_v3/service/category/action/list?ks=${this.state.AppTokenKs}&filter[objectType]=KalturaCategoryFilter&filter[fullNameStartsWith]=Premium>&format=1`)
    .then( (response)=> {
      console.log("Categories Content Session Success",response)
      let Data = response.data.objects
      this.setState({
        CategoriesData:Data
      })
      console.log("In Categories content function ",this.state.CategoriesData)
    }).catch((error)=>{
      console.log("In Categories content Session Error",error)
  })
  }
  _retrieveData = async () => {
    try {
      const Appks = await AsyncStorage.getItem('AppTokenks');
      if (Appks !== null) {
        // We have data!!
        console.log("In Async",Appks);
        this.setState({AppTokenKs:JSON.parse(Appks)})
      }
    } catch (error) {
      console.log("Async Error If",error)
    }
  }
  async componentWillMount(){
   await this._retrieveData();
   this.GetLiveContent();
   this.GetCategoriesContent();
  }
  onScroll = (event) => {
    const { navigation } = this.props;
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);  

    if (dif < 0) {
      navigation.setParams({ showTabBar: true });
    } else {
      navigation.setParams({ showTabBar: false });
    }
    //console.log('dif=',dif);

    this.offset = currentOffset;
  }      

  render() {
    const scrollY = new Animated.Value(0)
    const diffClampScrollY = Animated.diffClamp(scrollY,0,Header_Height)
    const headerY= Animated.interpolate(diffClampScrollY,{
      inputRange:[0,Header_Height],
      outputRange:[0,-Header_Height]
    })
    return (
      <View style={{backgroundColor:"white",flex:1}}>
         <Header />
        <Animated.ScrollView
        bounces={true}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent:{contentOffset:{y:scrollY}}
          }
        ])}
          showsVerticalScrollIndicator={false}
          >
        <View>
            <Text style={{marginLeft:10,color:"grey",marginBottom:10,marginTop:65}}>Live Content</Text> 
            <RecentlyPlayed navigation={this.props.navigation} LiveData ={this.state.LiveData} />
        </View>
        <Text style={{marginLeft:10,color:"grey",marginBottom:10,marginTop:10}}>Categories</Text>
        <View style={{flex:1}}>
            <RecommendedVideos navigation={this.props.navigation} Categories={this.state.CategoriesData} AppToken={this.state.AppTokenKs}/>
            </View>
       <View style={{marginTop:20,marginBottom:10,alignSelf:"center"}}>
           <Image source={require("../Imges/label.jpg")} style={{width:300,height:100,borderRadius:20}} />
       </View>
       
        </Animated.ScrollView>
      </View>
    );
  }
}

export default Home;
