import React, { Component } from 'react';
import { View, Text,Image,TouchableOpacity  } from 'react-native';

class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"white"}}>
       <View style={{width:"100%",height:"70%",backgroundColor:"white",bottom:0,position:"absolute"}}>
        <View>
            <Image source={require("../Imges/Logo.png")} style={{width:110,height:110,margin:20}} />
        </View>
        <View>
            <Text style={{fontSize:18,color:"#EC3376",marginLeft:30,fontWeight:"bold"}}>MusicGU</Text>
            <Text style={{fontSize:25,color:"black",marginLeft:30,fontWeight:"bold"}}>Prosonlized</Text>
            <Text style={{fontSize:25,color:"black",marginLeft:30,fontWeight:"bold"}}>Music Streaming</Text>
            <Text style={{fontSize:25,color:"black",marginLeft:30,fontWeight:"bold"}}>In Your Pocket</Text>
            <View style={{marginLeft:30,marginTop:10}}>
                <Text style={{fontSize:18}}>We stream music in our application </Text>
                <Text style={{fontSize:18}}>so you can listen continously</Text>
            </View>
        </View>
        <View style={{flexDirection:"row",width:300,height:50,borderRadius:20,borderWidth:3,borderColor:"#F5942D",backgroundColor:"white",alignSelf:"center",marginTop:30}}>
            <TouchableOpacity style={{width:"50%",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderBottomLeftRadius:18,borderTopLeftRadius:18,borderRightColor:"#F5942D",borderRightWidth:2}}
            onPress={()=>this.props.navigation.navigate("Login")}
            >
<Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center",width:"50%"}}
            onPress={()=>this.props.navigation.navigate("SignUp")} 
            >
<Text>SignUp</Text>
            </TouchableOpacity>
        </View>
       </View>
      </View>
    );
  }
}

export default Selection;
