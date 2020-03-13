import React, { Component } from 'react';
import { View, Text,ScrollView,Image,ImageBackground,TouchableOpacity,Platform,StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Left,Right,Body} from "native-base"
import Animated from "react-native-reanimated"
import RecentlyPlayed from './RecentlyPlayed';
import RecommendedVideos from './RecommendedVideos'

const Header_Height =Platform.OS == "ios" ?115:60;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
        <Animated.View style={{flexDirection:"row",transform:[{translateY:headerY}],zIndex:1000,position:"absolute",backgroundColor:"white",width:"100%",height:Header_Height,elevation:3}}>
         <Left> 
            <View>
                <Text style={{fontSize:18,color:"white"}}>Home</Text>
            </View>
            </Left>
            <Body>
              <View>
                <Text style={{fontSize:18,color:"black"}}>Home</Text>
            </View>
              </Body>
            <Right style={{marginRight:10}}>
             
            <View>
              <Icon name="bell" size={20} color="#EE5A4E" />
            </View>
            </Right>
        </Animated.View>
    );
  }
}

export default Header;
