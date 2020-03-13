import React, { Component } from 'react';
//import react in our code.
 
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Image,
  Alert,
} from 'react-native';
//import all the components we are going to use.
import Icon from "react-native-vector-icons/FontAwesome"
 
export default class Search extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: '',search:'',AppTokenKs:null,dataSource:[] };
    this.arrayholder = [];
  }
 
  async componentDidMount() {
    let AppTokenKs = '';
    try {
      AppTokenKs = await AsyncStorage.getItem('AppTokenks') || 'none';
      this.setState({AppTokenKs:JSON.parse(AppTokenKs)})
      console.log("App TOken KS in Video ",this.state.AppTokenKs)
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }

    return fetch(`http://cdn1.baselinux.net/api_v3/service/media/action/list?ks=${this.state.AppTokenKs}&filter[objectType]=kalturaMediaEntryFilter&pager[objectType]=kalturaFilterPager&format=1&filter[categoriesFullNameIn]=Premium&filter[freeText]=${this.state.text}`)
      .then(response =>  response.json())
      .then(responseJson => {
        console.log("this is search responce",responseJson),
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  SearchFilterFunction=async (text)=> {
    this.setState({
      search:text
    })
    return fetch(`http://cdn1.baselinux.net/api_v3/service/media/action/list?ks=${this.state.AppTokenKs}&filter[objectType]=kalturaMediaEntryFilter&pager[objectType]=kalturaFilterPager&format=1&filter[categoriesFullNameIn]=Premium&filter[freeText]=${text}`)
    .then(response =>  response.json())
    .then(responseJson => {
      console.log("this is search responce",responseJson),
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      console.error(error);
    });
    // //passing the inserted text in textinput
    // console.log("in Filter Function array",this.arrayholder.objects)
    // console.log("in Filter Function ",this.state.dataSource)

    // const newData = this.state.arrayholder.objects.filter((item)=> {
    //   //applying filter for the inserted text in search bar
    //   const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
    //   const textData = text.toUpperCase();
    //   return itemData.indexOf(textData) > -1;
    // });
    // this.setState({
    //   //setting the filtered newData on datasource
    //   //After setting the data it will automatically re-render the view
    //   dataSource: newData,
    //   text: text,
    // });
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <View style={{width:"100%",borderRadius:5,height:55,flexDirection:"row",borderColor:"#E0E0E0",borderWidth:2,backgroundColor:"white"}}>
        
        <Icon name="search" size={20} color="#E0E0E0" style={{marginLeft:5,marginRight:3,marginTop:10}} />
        <TextInput
          style={{width:295,height:40,marginTop:5,marginBottom:5,marginRight:5,backgroundColor:"#E0E0E0"}}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          value={this.state.search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        </View>
       {console.log("Waseem Check List ",this.state.dataSource)}
        <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={this.state.dataSource.objects}
        
          ItemSeparatorComponent={this.ListViewItemSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Played", { VideoUrl:item.dataUrl,Detail:item})}>
              <View style={{height:80,width:"100%",backgroundColor:"white",marginTop:10,marginBottom:5,flexDirection:"row"}}>
                 <View style={{flexDirection:"row"}}>
          {/* <Text style={{marginTop:25,marginLeft:5,marginRight:5,fontWeight:"bold"}}>{item.id}</Text> */}
                 <Image source={{uri:item.thumbnailUrl}} style={{marginTop:10,marginLeft:5,borderWidth:2,borderColor:"grey",width:50,height:50,borderRadius:15}} />
                   </View>
                   <View>
                     <View style={{flexDirection:"row"}}>
          <Text numberOfLines={1}ellipsizeMode="tail" style={{paddingBottom:3,width:200,paddingLeft:10,paddingTop:10,fontWeight:"bold"}}>{item.name} {'\n'}{'\n'}</Text>
          <Text numberOfLines={1}ellipsizeMode="tail" style={{paddingBottom:5,paddingLeft:10,color:"grey",paddingTop:5,fontWeight:"bold"}}>{item.duration}sec</Text>
          </View>
            <Text numberOfLines={1}ellipsizeMode="tail" style={styles.textStyle}>{item.description} {'\n'}{'\n'}</Text>
            </View>
</View>
</TouchableOpacity>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor:"white",
    // marginTop: 40,
     padding: 16
  },
  textStyle: {
    paddingTop:3,
    paddingLeft:10,
    width:200,
    paddingBottom:3 ,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#EE5A4E',
    backgroundColor: 'white',
  },
});