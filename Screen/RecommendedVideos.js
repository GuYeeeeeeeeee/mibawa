import React, { Component } from 'react';
import { View, Text,ScrollView,Image,StyleSheet,ImageBackground,TouchableOpacity,Platform,StatusBar,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Left,Right,Body} from "native-base";

class RecommendedVideos extends Component {
    RecommendedData=[
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
      AppToken:this.props.navigation.getParam('AppToken', "NotFound")
    };
  }

  render() {
    const {Categories} = this.props
    return (
      <View style={styles.MainContainer}>
        <FlatList
        data={Categories}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
           <View style={styles.GridViewBlockStyle} key={item.id}>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate("Featured",{CategoriesType:item})}
            >
            <View>
                {/* <Image source={require("../Imges/4.jpg")} style={{width:100,height:70,borderRadius:10}} /> */}
           <View style={{}}>
           <Text style={{color:"black",fontWeight:"bold"}} numberOfLines={1}>{item.name}</Text>
        <Text style={{color:"grey",marginTop:2,marginBottom:10,width:80}} numberOfLines={1}>{item.fullName}</Text>
           </View>
            </View>
            </TouchableOpacity>
            </View>
            
        )}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
MainContainer :{
justifyContent: 'center',
flex:1,
margin: 10,
paddingTop: (Platform.OS) === 'ios' ? 20 : 0
 
},
 
GridViewBlockStyle: {
  justifyContent: 'center',
  flex:1,
  alignItems:"center",
  alignItems: 'center',
  borderWidth:1,
  borderColor:"grey",
  height: 100,marginBottom:10,
  margin: 5,
 // backgroundColor: '#00BCD4'
 
}
,
 
GridViewInsideTextItemStyle: {
 
   color: '#fff',
   padding: 10,
   fontSize: 18,
   justifyContent: 'center',
   
 },
 
});

export default RecommendedVideos;
