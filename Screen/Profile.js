import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text,TextInput,TouchableOpacity,View,ToastAndroid,AsyncStorage,ImageBackground,Image, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import axios from 'axios'
import {Left,Right,Body} from "native-base"
import Modal from 'react-native-modal'

export default class Profile extends Component {
  state = {
    search: '',
    name:'',
    female:false,
    ResetModal:false,
    oldpass:'',
    newpass:'',
    NewName:'',
    phone:'',
    AppKS:'',
    male:false,
    email:"SomeOne@gmail.com",
    edit:false
  };
  _retrieveData = async () => {
    try {
      const name = await AsyncStorage.getItem('UserName');
      const phone = await AsyncStorage.getItem('UserPhone');
      const ks = await AsyncStorage.getItem('AppTokenks');
      if (name !== null) {
        // We have data!!
        console.log("In Async",name);
        this.setState({name:name})
      }
      if (phone !== null) {
        // We have data!!
        console.log("In Async",phone);
        this.setState({phone:phone})

      }
      if (ks !== null) {
        // We have data!!
        console.log("In Async",ks);
        this.setState({AppKS:ks})
      }
    } catch (error) {
      console.log("Async Error If",error)
    }
  }
  _storeData = async () => {
    try {
      console.log("Async REsponce Set",this.state.NewName);
      await AsyncStorage.setItem('UserName',this.state.NewName)
    } catch (error) {
      console.log("Async Error If",error)
    }
  };
  async componentWillMount (){
    await this._retrieveData();

}
UpdateName = async ()=>{
  console.log("In Update Name",this.state.NewName)
  axios.get(`http://stats.baselinux.net/viewer/updateName?ks=${this.state.AppKS}&newname=${this.state.NewName}`
)
.then( async (response)=> { 
console.log("Update Name Responce",response)
let message= response.data.result.status
ToastAndroid.show(message, ToastAndroid.SHORT);
this.setState({edit:false,name:this.state.NewName})
await this._storeData();
}).catch((error)=>{
  console.log("Update Name Error",error)
})

}
resetToogleModal =()=>{
  console.log("In Reset Password",this.state.newpass+"''''''"+this.state.oldpass)
  axios.get(`http://stats.baselinux.net/viewer/updatePass?phone=${this.state.phone}&password=${this.state.oldpass}&newpass=${this.state.newpass}`
)
.then( (response)=> { 
console.log("Reset Password Responce",response)
let message= response.data.result.status
ToastAndroid.show(message, ToastAndroid.SHORT);
}).catch((error)=>{
  console.log("Reset Password Error",error)
})
  this.setState({ResetModal:!this.state.ResetModal})
}

  updateSearch = search => {
    this.setState({search});
  };
  render() {
    const {search} = this.state;
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
    
        <StatusBar backgroundColor="#EE5A4E" barStyle="light-content" />
   
        <View style={{width:"100%",height:150,backgroundColor:"#EE5A4E"}}>
          <View style={{flexDirection:"row",marginTop:10}}>
<Left>
  <TouchableOpacity onPress={()=>this.props.navigation.navigate("Home")}>
  <Icon name="arrow-left"style={{marginLeft:10,color:"white"}} size={20} />
  </TouchableOpacity>
</Left>


<Body>
  <Text style={{fontSize:18,color:"white",fontWeight:"bold"}}>Profile</Text>
</Body>
<Right style={{flexDirection:"row",justifyContent:"flex-end"}}>
  <TouchableOpacity onPress={()=>this.setState({ResetModal:true})}>
    <Text style={{fontSize:14,marginRight:10,color:"white"}}>Reset Password</Text>
  </TouchableOpacity>
</Right>
</View>
<View style={{flexDirection:"row",marginTop:10,marginLeft:10}}>
  <View>
  <Image source={require("../Imges/ni.jpg")} style={{width:80,height:80,borderRadius:50,marginTop:10}} />
  </View>
  <Text style={{color:"white",fontSize:16,marginLeft:15,marginTop:40}}>Waseem Ahmed</Text>
</View>
        </View>
        <View style={{marginLeft:10,marginTop:20}}>
          <View style={{flexDirection:"row"}}>
<Text style={{marginLeft:5}}>Name: {this.state.name}</Text>
<TouchableOpacity onPress={()=>this.setState({edit:true})}>
<Icon name='edit' size={20} style={{marginLeft:20}}/>
</TouchableOpacity>
</View>
         { this.state.edit?
         <View>
           
         <TextInput
         underlineColorAndroid="grey"
            style={{backgroundColor:"white",height:40,marginBottom:10}}
            placeholderTextColor="grey"
            placeholder="Update Name Here"
           //  label='Enter Project Name'
           value={this.state.text}
          onChangeText={(NewName) => this.setState({ NewName })}
       />
       <TouchableOpacity style={{width:100,height:30,borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:'orange'}}
       onPress={this.UpdateName}
       >
         <Text style={{color:'white',fontSize:14}}>Update</Text>
       </TouchableOpacity>
       </View>
       :
         <Text></Text>
        }
        </View>
        <View style={{marginLeft:10,marginTop:10}}>
          <Text style={{marginLeft:5}}>Phone: {this.state.phone}</Text>
        </View>
     <View> 
       <View style={{width:250,height:50,borderWidth:0.5,borderColor:'grey',alignSelf:"center",marginTop:20}}>
       <TextInput
           style={{backgroundColor:"white",marginLeft:10,marginRight:5}}
           placeholderTextColor="grey"
           placeholder="User Network Token"
          value={this.state.text}
         onChangeText={this.onPasswordChange}
      />
         </View> 
         <TouchableOpacity style={{width:200,height:45,justifyContent:'center',alignItems:'center',alignSelf:'center',marginTop:20,backgroundColor:'#EE5A4E',borderRadius:5}}
         onPress={()=>this.props.navigation.navigate("Home")}
         >
           <Text style={{color:'white',fontSize:14}}>Subscribe ></Text>
         </TouchableOpacity>
     </View>
     <Modal style={{width:"90%",height:230}} isVisible={this.state.ResetModal} onBackdropPress={()=>this.setState({ResetModal:false})}>
   
   <View style={{backgroundColor:"white",borderRadius:10,elevation:3,width:"100%",height:230}}>
   <View style={{width:250,height:50,justifyContent:"center",alignItems:"center",borderWidth:0.5,alignSelf:"center",marginTop:20,marginBottom:20,borderColor:"grey"}}>
   <TextInput
       //  underlineColorAndroid="grey"
           style={{backgroundColor:"white"}}
           placeholderTextColor="grey"
           placeholder="Old Password"
          //  label='Enter Project Name'
          value={this.state.text}
          onChangeText={(oldpass) => this.setState({ oldpass })}

      />
      </View>
   <View style={{width:250,height:50,justifyContent:"center",alignItems:"center",borderWidth:0.5,alignSelf:"center",marginTop:5,marginBottom:20,borderColor:"grey"}}>
      
       <TextInput
       //  underlineColorAndroid="grey"
           style={{backgroundColor:"white"}}
           placeholderTextColor="grey"
           placeholder="New Password"
          //  label='Enter Project Name'
          value={this.state.text}
          onChangeText={(newpass) => this.setState({ newpass })}

      />
      </View>

      <TouchableOpacity style={{width:200,justifyContent:"center",alignItems:"center",alignSelf:"center",height:50,borderRadius:10,backgroundColor:'orange'}}
      onPress={this.resetToogleModal}
      >
        <Text style={{color:"white",fontSize:14}}>Update Password</Text>
      </TouchableOpacity>
   </View>
 </Modal>
 </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    width: 300,
    backgroundColor: '#ffffff',
    maxHeight: 300,
    borderRadius: 5,
    overflow: 'hidden',
},
option: {
    width: 300,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
}
});
