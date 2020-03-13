import React, { Component } from 'react';
import { View, Text ,Image,ScrollView ,TouchableOpacity,AsyncStorage,FlatList} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import axios from 'axios';
import Video from 'react-native-af-video-player';

class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
        AppTokenKs:null,
        VideoData:null,
        categoriesType:this.props.navigation.getParam('CategoriesType', "NotFound")
    };
  }
      GetPremiumVideo =()=>{
        console.log("App Token Ks in GetPremiumVideo Function",this.state.AppTokenKs)
        axios.get(`http://cdn1.baselinux.net/api_v3/service/media/action/list?ks=${this.state.AppTokenKs}&filter[objectType]=KalturaMediaEntryFilter&pager[objectType]=KalturaFilterPager&filter[mediaTypeEqual]=1&filter[categoriesFullNameIn]=Premium>${this.state.categoriesType.name}&format=1`)
        .then( (response)=> {
          console.log("Preminum Video Getting Session Success",response)
        console.log("In the feature to differentiate",this.state.categoriesType)
let  Videos = response.data.objects
this.setState({
        VideoData:Videos
})
        // response.data.objects.map((video)=>{
        //     console.log("video getting in map function",video.dataUrl)
        // })
          console.log("In Preminum Video Getting function ",this.state.VideoData)
    
        }).catch((error)=>{
          console.log("Preminum Video Getting Session Error",error)
      })
      }
      async componentWillMount(){
        let AppTokenKs = '';
        try {
          AppTokenKs = await AsyncStorage.getItem('AppTokenks') || 'none';
          this.setState({AppTokenKs:JSON.parse(AppTokenKs)})
          console.log("App TOken KS in Features ",this.state.AppTokenKs)
          console.log("App TOken KS in Features ",await AsyncStorage.getItem('AppTokenks') || 'none')

        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
       this.GetPremiumVideo()
      }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"white"}}>
        <View style={{width:"100%",height:"30%",backgroundColor:"white",borderBottomWidth:1,borderBottomColor:"grey"}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Home")}>
<View>
    
    <Icon name="arrowleft" size={24} style={{margin:15,width:20,height:20}} />
   
</View>
</TouchableOpacity>
<View style={{flexDirection:"row",alignSelf:"center"}}>
    <Image source={require("../Imges/2.jpg")} style={{borderRadius:20,width:150,height:150}} />
<View style={{marginLeft:20,marginTop:20}}>
    <Text style={{color:"grey",fontSize:16}}>FEATURED</Text>
    <Text style={{color:"black",fontWeight:"bold",fontSize:20}}>Pop Before it</Text>
    <Text style={{color:"grey",fontSize:14,marginTop:30}}>no of tracks: 132</Text>
</View>
</View>
        </View>
        <View style={{width:"100%",height:"70%",backgroundColor:"white"}}>
          {
             this.state.VideoData === null ||this.state.VideoData.length===0?
                  <View style={{width:150,elevation:3,marginTop:10,height:40,alignSelf:"center",backgroundColor:"white",borderRadius:5,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:13}}>No Videos In {this.state.categoriesType.name}</Text>
                    </View>
              :
                <FlatList
                data={this.state.VideoData}
                // horizontal={true}
                showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{ paddingBottom: 55}}
                renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Played", { VideoUrl:item.dataUrl,Detail:item})}>
                        <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
                    <Image source={{uri:item.thumbnailUrl}} style={{width:60,height:60,borderRadius:10}} />
               <View style={{marginLeft:10}}>
              
                       <View style={{flexDirection:"row"}}>
               <Text style={{color:"black",fontWeight:"bold",width:130}} numberOfLines={1}>{item.name}</Text>
                <Text style={{color:"grey",fontWeight:"bold",marginLeft:60}}>{item.duration} sec</Text>
               </View>
              
                       <Text style={{color:"grey",marginTop:10}}>{item.categories}</Text>
               </View>
                </View>
                </TouchableOpacity>
                )}
              />
                }
      
       

            {/* <ScrollView>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Played")}>
                    <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
                <Image source={require("../Imges/1.jpg")} style={{width:60,height:60,borderRadius:10}} />
           <View style={{marginLeft:10}}>
          
                   <View style={{flexDirection:"row"}}>
           <Text style={{color:"black",fontWeight:"bold"}}>Don't Look back in the Anger</Text>
           <Text style={{color:"grey",fontWeight:"bold",marginLeft:60}}>3.25</Text>

           </View>
          
                   <Text style={{color:"grey",marginTop:10}}>Recommend</Text>
           </View>
            </View>
            </TouchableOpacity>
            </ScrollView> */}
        </View>
      </View>
    );
  }
}

export default Featured;
