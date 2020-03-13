import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons";
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name:'',
      Phone:'',
      Password:''
    };
  }
  SignUp=()=>{
    axios.get(`http://stats.baselinux.net/viewer/signup?name=${this.state.Name}&phone=${this.state.Phone}&password=${this.state.Password}`)
    .then( (response)=> {
      console.log("Signup Suceess",response)
      this.props.navigation.navigate("Login")
      // ToastAndroid.show('Liked', ToastAndroid.SHORT);
    }).catch((error)=>{
      console.log("Signup Error",error)
  })
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
        <View style={{width:"100%",position:"absolute",top:0,height:50,flexDirection:"row",backgroundColor:"white"}}>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate("Login")}
          >
           <Image source={require("../Imges/back.png")}  style={{width:35,height:30,marginTop:10,marginLeft:10}}/>
           </TouchableOpacity>
        <Text style={{color:'black',fontSize:16,fontWeight:"bold",marginLeft:"30%",marginTop:15,justifyContent:"center",alignItems:"center"}}>SignUp</Text>
        </View>

        {/* <View style={{width:150,height:100,alignSelf:"center"}}>
            <Image source={require("../Imges/2.jpg")} style={{width:100,height:100,marginTop:10,borderRadius:50,alignSelf:"center"}} ></Image>
       <View style={{backgroundColor:"#F5942D",width:40,justifyContent:"center",position:"absolute",top:68,right:5,bottom:10,alignItems:"center",height:40,borderRadius:25}}>
       <Image source={require("../Imges/camera.png")}  style={{width:20,height:20}}/>
       </View>
        </View> */}
        <View style={{width:"90%",justifyContent:"center",alignItems:"center",height:300,elevation:1,borderRadius:0,marginTop:20,alignSelf:"center"}}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Name"
              keyboardType="email-address"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
               onChangeText={(Name) => this.setState({Name})}/>

          <Image style={styles.inputIcon} source={require("../Imges/name.png")}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Phone"
              keyboardType={'phone-pad'}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
             onChangeText={(Phone) => this.setState({Phone})}/>

          <Image style={styles.inputIcon} source={require("../Imges/email.png")}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              // keyboardType="email-address"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(Password) => this.setState({Password})}/>

          <Image style={styles.inputIcon} source={require("../Imges/pass.png")}/>
        </View>
        <LinearGradient colors={['#F4932A','#EE5A4E', '#EC3376',]} style={{marginTop:10,justifyContent:"center",alignItems:"center",alignSelf:"center",width:280,height:50,backgroundColor:"grey",borderRadius:25}}>
<TouchableOpacity
onPress={this.SignUp}
style={{justifyContent:"center",alignItems:"center",alignSelf:"center",width:280,height:50}}
>
            <Text style={{color:"white",fontSize:16}}>Sign Up</Text>
        </TouchableOpacity>
</LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: 'white',
    },
    inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:300,
      height:45,
      marginBottom:10,
      flexDirection: 'row',
      alignItems:'center',
  
      shadowColor: "#808080",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginRight:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      marginLeft:20,
      width:300,
      borderRadius:30,
      backgroundColor:'transparent'
    },
    btnForgotPassword: {
      height:15,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginBottom:10,
      width:300,
      backgroundColor:'transparent'
    },
    loginButton: {
      backgroundColor: "black",
  
      shadowColor: "#808080",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,
  
      elevation: 19,
    },
    loginText: {
      color: 'white',
    },
    bgImage:{
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      top:20
      // justifyContent: 'center',
    },
    btnText:{
      color:"black",
      fontWeight:'bold',
      marginLeft:20,
      alignSelf:"center"
    }
  }); 


export default SignUp;
