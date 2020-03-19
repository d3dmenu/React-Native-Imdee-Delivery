import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView, Keyboard, Alert, Dimensions, AsyncStorage, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons,Feather,Foundation,MaterialCommunityIcons,Octicons,AntDesign} from '@expo/vector-icons';
import database from '../Database/Database.js'
import * as firebase from "firebase";
import "@firebase/firestore";

export default class StatusPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      height : Dimensions.get('window').height*(7.5/100),
      status : [0,0,0],
      token:'',
      realuser : '',
      nameRes:'',
      ttprice:0,
      nameUsr:'',
      tosend:[]
    }
    var items = this.props.navigation.getParam('items');
    this.setState({token:items})
    this.onAsyncRead();
  }

  readOrderbydoc_success = (data) =>{
    this.setState({status:data.Order.Process, nameUsr:data.Order.NameUser, nameRes:data.Order.NameRestaurant, ttprice:data.Order.TotalPrice})
    console.log(this.state.nameUsr)
  }

  
  onAsyncRead=async ()=>{
    var account = await AsyncStorage.getItem('account_IMDEE');
    account = JSON.parse(account);
    var items1 = this.props.navigation.getParam('items');
    this.setState({realuser:account.Email+':'+account.Phone})
    database.readOrder(account.Email+':'+account.Phone, 'Restaurant', this.readOrder_success);
    this.setState({realuser:account.Email+':'+account.Phone})
    this.setState({token:items1})
    database.readOrderbydoc(account.Email+':'+account.Phone, 'Restaurant', this.readOrderbydoc_success,items1);
  }

  btn1_success_callback = (obj) =>{
    firebase.firestore().collection('SE_Restaurant/IMDEE/Restaurant/'+this.state.realuser+'/AllOrder').doc(this.state.token).update({Process : [ 1:0,1:1,0:2 ]})
    firebase.firestore().collection('SE_Restaurant/IMDEE/Restaurant/'+this.state.realuser+'/AllOrder').doc(this.state.token).update({Status : 1})
  }
  btn2_success_callback = (obj) =>{
    firebase.firestore().collection('SE_Restaurant/IMDEE/Restaurant/'+this.state.realuser+'/AllOrder').doc(this.state.token).update({Process : [ 1:0,1:1,1:2 ]})
    firebase.firestore().collection('SE_Restaurant/IMDEE/Restaurant/'+this.state.realuser+'/AllOrder').doc(this.state.token).update({Status : 2})
  }

  readOrder_success = (obj) =>{
    
  }

  readOrderbydoc1_success = (data) =>{
    this.setState({tosend:data})
    this.props.navigation.navigate('FourScreen', {items:data})
  }

  onPress_Arrow(){
    database.readOrderbydoc1(this.state.realuser, 'Restaurant', this.readOrderbydoc1_success,this.props.navigation.getParam('items'));
    
    
  }

  btn1_onPress_update(){
    database.readOrder(this.state.realuser, "Restaurant", this.btn1_success_callback)
  }
  btn2_onPress_update(){
    database.readOrder(this.state.realuser, "Restaurant", this.btn2_success_callback)
  }
  onPress_back(){
    this.props.navigation.navigate('SecondScreen');
  }
    render() {
        return (

          <View style={styles.bg}>
            <StatusBar barStyle="dark-content" />
                  
                  <View style={styles.back}>
                    <View style={{alignItems:'flex-start',marginTop:'10%',marginLeft:'5%'}}>
                      <TouchableOpacity onPress={this.onPressLogout }
                        style={{flexDirection:'row',padding:5,paddingLeft:5,paddingRight:5,justifyContent:'center',alignItems:'center',backgroundColor:'transparent',borderRadius:100}}
                        onPress = {() => this.onPress_back()}>
                        <AntDesign style={{paddingRight:5,color:'#FFF'}} name={'left'} size={20}/>
                          <Text style={{color:'#FFF',fontSize:18}}>Back</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.body}>

                          <View style={{flex:0.15, backgroundColor:'white', alignSelf:'center', borderRadius:70, width: 70, height:40, marginTop:'10%',position:'absolute', margin:2 }}>
                              <Image
                              style = {{width:50, height:50, alignSelf:'center', marginTop:'15%'}}
                              source = {require('../image/box1.png')}/>
                          </View>
                          <View style={{flex:1, backgroundColor:'transparent', marginLeft:'3%', flexDirection:'row', marginTop:'10%'}}>

                              <View style={{position:'absolute',bottom:(this.state.height-7.5)*5,left:(this.state.height-7.5)/2,width:this.state.height/8,height:this.state.height,backgroundColor:'#FFFFFF'}}/>
                              <View style={{position:'absolute',bottom:(this.state.height-7.5)*3,left:(this.state.height-7.5)/2,width:this.state.height/8,height:this.state.height,backgroundColor:'#FFFFFF'}}/>


                          <View style={{position:'absolute',bottom:(this.state.height-7.5)*6,justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                              <View style={{height:this.state.height,width:this.state.height,justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF',borderRadius:100}}>
                                  <View style={{height:this.state.height/2,width:this.state.height/2,backgroundColor:"#02E079",borderRadius:100}}/>
                              </View>
                              <Text style={{color:'white',fontSize:14,fontWeight:'bold',marginLeft:10, width:220}}>Order price on 26 January</Text>
                          </View>

                          <View style={{position:'absolute',bottom:(this.state.height-7.5)*4,justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                              <View style={{height:this.state.height,width:this.state.height,justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF',borderRadius:100}}>
                                  <View style={{height:this.state.height/2,width:this.state.height/2,backgroundColor:(this.state.status[1]==1)?'#02E079':'#DCDCDC',borderRadius:100}}/>
                              </View>
                              <Text style={{color:'white',fontSize:14,fontWeight:'bold',marginLeft:10,width:220}}>Order Accepted on 26 January</Text>
                              <TouchableOpacity style={{borderRadius:10, backgroundColor:'white', alignItems:'flex-end', height:25,justifyContent:'center'}}
                                  onPress={() => this.btn1_onPress_update()}>
                                  <Text style={{color:'#0CCD69'}}> UPDATE </Text>
                              </TouchableOpacity>
                          </View>

                          <View style={{position:'absolute',bottom:(this.state.height-7.5)*2,justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                              <View style={{height:this.state.height,width:this.state.height,justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF',borderRadius:100}}>
                                  <View style={{height:this.state.height/2,width:this.state.height/2,backgroundColor:(this.state.status[2]==1)?'#02E079':'#DCDCDC',borderRadius:100}}/>
                              </View>
                              <Text style={{color:'white',fontSize:14,fontWeight:'bold',marginLeft:10,width:220}}>Processing order</Text>
                              <TouchableOpacity style={{borderRadius:10, backgroundColor:'white', alignItems:'flex-end', height:25,justifyContent:'center'}}
                                  onPress={() => this.btn2_onPress_update()}>
                                  <Text style={{color:'#0CCD69'}}> UPDATE </Text>
                              </TouchableOpacity>
                          </View>



                      </View>

                  </View>

                  <View style={styles.bot}>
                    <View style={{flex:0.9, backgroundColor:'transparent', margin: '5%', alignSelf: 'center', borderRadius:20, borderWidth:1, borderColor:'#F7F7F7', justifyContent:'center'}}>
                        <View style={{flex:0.3, backgroundColor:'transparent', margin:10, marginTop:10}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'flex-start', backgroundColor:'transparent', flex:1}}>
                                    <Text style={{fontSize:16, margin:3}}> Requirement </Text>
                                </View>
                                <View style={{justifyContent:'flex-end', backgroundColor:'transparent'}}>
                                    <TouchableOpacity  style={{flex:1}} onPress={() => this.onPress_Arrow()}>
                                        <Ionicons name="ios-arrow-forward" size={30} color='#979797'/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{fontSize:22, margin:3}}> {this.state.nameRes} </Text>

                        </View>

                        <View style={{borderBottomColor: 'gray',borderBottomWidth: 1, margin: 4}}></View>

                        <View style={{flex:0.4,flexDirection:'row', alignContent:'center' , backgroundColor:'transparent'}}>
                          <View style={{flex:1, backgroundColor:'transparent', flexDirection:'column', margin:5, alignItems:'center'}}>
                              <Text style={{ fontSize:16, marginTop:5}}> Assigned </Text>
                              <Text style={{ fontSize:14, marginTop:10}}> {this.state.nameUsr} </Text>
                          </View>
                          <View style={{flex:1, backgroundColor:'transparent', flexDirection:'column', margin:5, alignItems:'center'}}>
                              <Text style={{ fontSize:16, marginTop:5}}> Price </Text>
                              <Text style={{ fontSize:14, marginTop:10}}> {this.state.ttprice} THB </Text>
                          </View>
                        </View>
                    </View>
                  </View>

          </View>

      );}

}
const styles = StyleSheet.create({
  bg : {
    flex: 1,
    flexDirection : 'column',
  },
  back : {
    flex: 0.0,
    backgroundColor: '#12C95C',
  },
  top : {
    flex: 0.04,
    backgroundColor: 'transparent',
  },
  body : {
    flex: 0.7,
    backgroundColor: '#12C95C',
    borderBottomRightRadius : 50,
    borderBottomLeftRadius : 50,
  },
  bot : {
    flex : 0.31,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf:'center'
  }
});
