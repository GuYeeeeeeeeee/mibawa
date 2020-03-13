import React, { Component } from 'react';
import { View, Text,ScrollView,Image,ImageBackground,TouchableOpacity,Platform,StatusBar,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Left,Right,Body} from "native-base"
// import { useNavigation } from '@react-navigation/native';
class RecentlyPlayed extends Component {
    RencentData=[
        {
            UserImages: require('../Imges/1.jpg'),
            name:'In My Hours',
            thumbnail:"HipHop"
        },
        {
            UserImages: require('../Imges/2.jpg'),
            name:'Playing Jordan',
            thumbnail:'Classic'
        },
        {
            UserImages: require('../Imges/3.jpg'),
            name:'More Sphere',
            thumbnail:'Refs'
        },
        {
            UserImages: require('../Imges/4.jpg'),
            name:'Little Happy',
            thumbnail:'Base Bosted'
        }
    ]
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {LiveData } = this.props;
    const {navigation} = this.props;
    console.log("Check YOUR dATA IN rECENTLY lIST",LiveData)
    // console.log("In the Recently Played",LiveContent)
    return (
      <View>
        <FlatList
        data={LiveData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: 55}}
        renderItem={({ item }) => (
            <TouchableOpacity
            key={item.id}
            onPress={()=>navigation.navigate("Played",{LiveStream:item.hlsStreamUrl,Detail:item})}
            >
        <View style={{backgroundColor:"white",width:200,height:250,marginLeft:10}}>
            <ImageBackground
             source={{uri:item.thumbnailUrl}} style={{width:200,height:200,borderRadius:20}}
            imageStyle={{borderRadius:20,resizeMode:"cover"}}
             />
        
           <View style={{justifyContent:"center",alignItems:"center"}}>
               <Text style={{color:"black",fontWeight:"bold"}}>{item.name}</Text>
               <Text style={{color:"grey"}}>{item.categories}</Text>
               </View> 
        
        </View></TouchableOpacity>
        )}
      />
      </View>
    );
  }
}

export default RecentlyPlayed;
