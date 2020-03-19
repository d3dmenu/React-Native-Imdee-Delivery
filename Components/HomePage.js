import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo'
import {
  StyleSheet, Text,
  TextInput,  TouchableOpacity, View,
  Button, ImageEditor,Image,Alert,TouchableHighlight,ScrollView,FlatList,AsyncStorage,StatusBar,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {Ionicons,Feather,Foundation,MaterialCommunityIcons,Octicons} from '@expo/vector-icons';
import database from '../Database/Database.js'
import styles from "../style/HomePage.js";


export default class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.onAsyncRead();
    this.state = {
      dataSource : [],
      realuser:'', lengthObj:0, dataObjShow:[],i:0,status:0,see:0
    }
    
  }

  onRequest = ()=>{
    this.setState({status:0});
    //console.log(this.state.status);
  }
  onSuccess = ()=>{
    this.setState({status:2});
    //console.log(this.state.status);
  }
  onWaiting = ()=>{
    this.setState({status:1});
    //console.log(this.state.status);
  }

  onPressSeemore = () =>{
    var length = this.state.lengthObj-this.state.i;
    if(length>4){
      length = 4
    }
    const x = this.state.i;
    for(var i=x;i<length+x;i++){
      this.state.dataObjShow.splice(this.state.dataObjShow.length-1 ,0 ,this.state.dataSource[i]);
      this.setState({dataObjShow:this.state.dataObjShow});
    }
    //set deley
    setTimeout(()=>{
      this.setState({i:this.state.i+length})
      if(this.state.i>=this.state.lengthObj){
        this.setState({dataObjShow:this.state.dataObjShow,see:0});
      }
    },20)
  }

  onPressToView = (items) =>{
    console.log(items);
    this.props.navigation.navigate('ThirdScreen', {items:items})
  }

  readOrder_success = (obj) =>{
    this.setState({lengthObj:obj.length,dataSource:obj,dataObjShow:[]});
    if(obj.length<=100){
      this.setState({dataObjShow:obj});
    }
    else{
      this.setState({i:0});
      for(var i=0;i<4;i++){
        this.state.dataObjShow.push(obj[i]);
        this.setState({i:this.state.i+1, dataObjShow:this.state.dataObjShow});
      }
      this.setState({see:1});
    }
   console.log(this.state.dataObjShow); 
  }

  onPressLogout = (state) =>{
    if(state==1)
      Alert.alert('ออกจากระบบเรียบร้อยแล้ว');
    database.logoutAccount(this.state.realuser, this.logoutAccount_success);
  }

  logoutAccount_success = () =>{
    this.onAsyncWrite();
  }

  onAsyncWrite= async () => {
    await AsyncStorage.setItem('account_IMDEE', '');
    await AsyncStorage.setItem('myCart_IMDEE', '');
    this.props.navigation.navigate('SpashScreen');
  };

  onAsyncRead=async ()=>{
    var account = await AsyncStorage.getItem('account_IMDEE');
    account = JSON.parse(account);

    this.setState({realuser:account.Email+':'+account.Phone})
    database.readOrder(account.Email+':'+account.Phone, 'Restaurant', this.readOrder_success);
  }
  render() {
      return (
      <View style={{flex: 1 ,backgroundColor:'#F7F7F7'}}>
        <StatusBar barStyle="dark-content" />
        
        <View style={{flex:0.37}}>
          <LinearGradient colors={['#12C95C','#02E079','#16B958']} style={{flex:1}}>
              <View style={styles.logout}>
                <TouchableOpacity onPress={this.onPressLogout } style={styles.obj}>
                  <Foundation style={{paddingRight:5,color:'#2196EB'}} name={'power'} size={20}/>
                    <Text style={{color:'#2196EB',fontSize:15}}>Log out</Text>
                </TouchableOpacity>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.circle}>
                        <View style={styles.circle1}>
                        <View style={styles.circle2}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../image/box.png')} style={{width: 60, height: 60}}/>
                            </View>
                        </View>
                        </View>
                    </View>
              </View>
            <View style={styles.mocup}>

              <View style={{width:'34%',height:'56%'}}>
                <TouchableOpacity style={styles.btnBase} onPress={()=>this.onRequest()}>
                  <Feather
                    name='box'
                    color='#696969'
                    size={36}
                    style={{marginTop:'15%'}}
                  />

                  <Text style={{color:'#696969'}}>Request</Text>

                </TouchableOpacity>
              </View>

              <View style={{width:'34%',height:'56%'}}>
                <TouchableOpacity style={styles.btnBoss} onPress={()=>this.onSuccess()}>
                  <MaterialCommunityIcons
                    name='truck-delivery'
                    color='#696969'
                    size={36}
                    style={{marginTop:'15%'}}
                  />

                  <Text style={{color:'#696969'}}>Success</Text>

                </TouchableOpacity>
              </View>

        
              <View style={{width:'34%',height:'56%'}}>
                <TouchableOpacity style={styles.btnBase} onPress={()=>this.onWaiting()}>
                  <MaterialCommunityIcons
                    name='format-list-bulleted'
                    color='#696969'
                    size={36}
                    style={{marginTop:'15%'}}
                  />

                  <Text style={{color:'#696969'}}>Waiting</Text>

                </TouchableOpacity>
              </View>

            </View>
          </LinearGradient>
        </View>
        
        <View style={{flex:0.60}}>
          <View style={{marginLeft:'5%'}}>
            <Text style={{color:'#838383',marginTop:'15%'}}>Recent  Activity</Text>
          </View>
          <View style={styles.lol}>
              <FlatList
              data={this.state.dataObjShow}
              renderItem={({ item }) => (item.Order.Status == this.state.status)
                                        ?<View style={{width:'100%',alignItems:'flex-start',borderRadius:10}}>
                                          <TouchableOpacity style={{borderRadius:10,width:'100%',flexDirection:'row'}} onPress={()=>this.onPressToView(item.ID)}> 
                                            <View style={{marginLeft:'3%',flexDirection:'column',marginTop:'3%',width:'70%'}}>
                                                <Text style={{color:'#696969',marginBottom:'5%',fontSize:13,fontWeight:'bold'}}>{item.Order.NameUser}</Text>
                                                <Text style={{color:'#696969',marginBottom:'5%',fontSize:12}}>{item.Order.Address}</Text>
                                            </View>
                                            <View style={{width:'15%',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={{color:'#2196EB',marginBottom:'5%',fontWeight:'bold',fontSize:13}}>Detail</Text>
                                            </View>
                                            <View style={{width:'15%',justifyContent:'center',alignItems:'center'}}>
                                                <Ionicons
                                                  name='ios-arrow-forward'
                                                  color='#696969'
                                                  size={27}
                                                  style={{}}
                                                />
                                            </View>
                                          </TouchableOpacity>
                                        </View>
                                        :null
                          }
              style={{marginTop:'2%',width:'100%'}}
            />
          </View>
        
        
        
          <View style={{alignItems:'center',marginTop:'5%'}}>
            {
              (this.state.see == 1)?
              <TouchableOpacity style={styles.obj} onPress={()=>this.onPressSeemore()}>
                <Foundation style={{paddingRight:5,color:'#2196EB'}} name={'refresh'} size={20}/>
                  <Text style={{color:'#2196EB',fontSize:15}}>See more</Text>
              </TouchableOpacity>:null
            }
            
          </View>
        </View>
      </View>
    );
  }
}


