import React, { Component } from 'react';
import { View, Text,Image,TouchableOpacity,ToastAndroid,TextInput,ActivityIndicator,StyleSheet,AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import { sha256 } from 'react-native-sha256';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEnterTOken:null,
      Phone:'',
      Password:'',
      getName:'',
      KalturaSession:"",
      HashKey:'',
      loading:false,
      AppTokenKS:''
    };
  }
LoginRequest= async ()=>{
  console.log("This Entered Token User",this.state.UserEnterTOken)
 axios.get(`http://stats.baselinux.net/viewer/login?phone=${this.state.Phone}&password=${this.state.Password}`)
  .then( async (response)=> {
    console.log("Phone",this.state.Phone)
    console.log("Passowrd",this.state.Password)
    console.log("In Auth Session Success",response)
    let ks = response.data.result.ks
    let name = response.data.result.viewerName
    console.log("User name",name)
    this.setState({AppTokenKS:ks})
    this.setState({getName:name})
    console.log("User name state",this.state.getName)
    console.log("The Ks getting from Login",this.state.AppTokenKS)
await this._storeData()
    this.props.navigation.navigate('Profile',{AppTokenKS:ks})
  }).catch((error)=>{
    console.log("In Auth Session Error",error)
})
}
_storeData = async () => {
  try {
    console.log("Async AppTOken",this.state.AppTokenKS);
    console.log("Async Name",this.state.getName);
    console.log("Async Phone",this.state.Phone);

await AsyncStorage.setItem('AppTokenks',JSON.stringify(this.state.AppTokenKS));
await AsyncStorage.setItem('UserName',JSON.stringify(this.state.getName));
await AsyncStorage.setItem('UserPhone',JSON.stringify(this.state.Phone));
  } catch (error) {
    console.log("Async Error If",error)
  }
};
GetList = ()=>{
  console.log("Here in  the Getlist")
  axios.get(`http://cdn1.baselinux.net/api_v3/service/category/action/list?ks=MDI0MmE0MjRkZWRjOGYyMWNjZTIwOTMzMTZhYzMzZjNmMjFhZGIwOHwxMDI7MTAyOzE1ODI3MDg4MDc7MDsxNTgyNjIyNDA3Ljg1Mjc7MDt2aWV3Oiosd2lkZ2V0OjE7Ow==&page=[]filter=[]&format=1`
)
.then( (response)=> { 
console.log("3rd Request Responce",response)
}).catch((error)=>{
  console.log("3rd Request Error",error)
})

}
  render() {
    const {loading } = this.state;

    return (
      <View style={{flex:1,backgroundColor:"white"}}>
       <View style={{width:"100%",height:"90%",backgroundColor:"white",bottom:0,position:"absolute"}}>
        <View>
            <Image source={require("../Imges/Logo.png")} style={{width:80,height:80,margin:20}} />
        </View>
        <View style={{marginLeft:20,marginTop:20,marginBottom:30}}>
            <Text style={{fontWeight:"bold",fontSize:18}}>Hi There !</Text>
            <Text style={{fontWeight:"bold",fontSize:22}}>Wellcome Back.</Text>
        </View>

        <View style={{justifyContent:"center",alignItems:"center",marginBottom:30}}>
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
   
        </View>
        <LinearGradient colors={['#F4932A','#EE5A4E', '#EC3376',]} style={{justifyContent:"center",alignItems:"center",alignSelf:"center",width:280,height:50,backgroundColor:"grey",borderRadius:25}}>
        <TouchableOpacity 
        onPress={this.LoginRequest
          // ()=>this.props.navigation.navigate("Home")
        
        }
        style={{justifyContent:"center",alignItems:"center",alignSelf:"center",width:280,height:50}}
        >
            <Text style={{color:"white",fontSize:16}}>Login</Text>
        </TouchableOpacity>
</LinearGradient>
        
<LinearGradient colors={['#F4932A','#EE5A4E', '#EC3376',]} style={{marginTop:20,justifyContent:"center",alignItems:"center",alignSelf:"center",width:280,height:50,backgroundColor:"grey",borderRadius:25}}>
<TouchableOpacity
onPress={()=>this.props.navigation.navigate('SignUp')}
style={{justifyContent:"center",alignItems:"center",alignSelf:"center",width:280,height:50}}>
            <Text style={{color:"white",fontSize:16}}>Create New Account</Text>
        </TouchableOpacity>
</LinearGradient>
        
       </View>
       {loading ?<ActivityIndicator style={{alignSelf:"center",position:"absolute",bottom:100}} size="large" color="orange" />:<View></View> }
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
export default Login;
