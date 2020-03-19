import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, StatusBar, Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView, Keyboard, Alert, Dimensions, AsyncStorage } from 'react-native';
import {Ionicons,Feather,Foundation,MaterialCommunityIcons,Octicons,AntDesign} from '@expo/vector-icons';
import database from '../Database/Database.js'
import styles from "../style/StatusPageOrder.js";

export default class StatusPageOrder extends React.Component{
    constructor(props){
      super(props);
      var items = this.props.navigation.getParam('items');
      this.state = {
        items:items,
        dataSource : [],
        data : []
      }
      console.log(items);
      this.onAsyncRead();
      this.setState({data:items})
    }
    onPressBack = () =>{
      this.props.navigation.navigate('SecondScreen')
    }
    readMenuInOrder_success = (obj) =>{
      var data = {
        ID_Menu: "",
        Name: "",
        Price: 0,
        Type: "",
        Value: 0,
      }
      obj.push(data);
      this.setState({dataSource:obj});
    }
    onAsyncRead = async () =>{
      var account = await AsyncStorage.getItem('account_IMDEE');
      account = JSON.parse(account);
      console.log(items)
      database.readMenuInOrder(account.Email+':'+account.Phone, this.state.items.ID, this.state.items.Path, this.readMenuInOrder_success);
    }
    render() {
        return (
          <LinearGradient
            colors={['#12C95C','#02E079','#16B958']}
            style={{ flex: 1 }}
          >
            <View style={{flex:0.03}}/>
            <StatusBar barStyle="dark-content" />
            <View style={{alignItems:'flex-start',marginTop:'5%',marginLeft:'5%', height: '7%'}}>
              <TouchableOpacity onPress={this.onPressBack } style={{flexDirection:'row'}}>
                <AntDesign style={{paddingRight:5,color:'#FFF',marginTop:'1%'}} name={'left'} size={20}/>
                <Text style={{color:'#FFF',fontSize:18}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.view1}>
              <View style={styles.view2}>
                <Text style={styles.text6}>รายการสินค้า</Text>

                <FlatList
                  data = {this.props.navigation.getParam('items')}
                  style={{marginTop:10, backgroundColor: "#FFF", borderRadius: 10}}
                  renderItem = {({item,index}) =>
                    (true)
                    ? <View style={styles.view5}>
                        <Text style={styles.text5}>{index+1}</Text>
                        <View style={styles.view8}>
                          <Text style={styles.text1}>{'ชื่อสินค้า : '+ item.Name}</Text>
                          <Text style={styles.text1}>{'ชนิดสินค้า : '+ item.Type}</Text>
                          <Text style={styles.text1 }>{'จำนวน : '+ item.Value}</Text>
                          <Text style={styles.text1}>{'ราคาต่อหน่วย : '+ item.Price}</Text>
                          <View style={styles.view3}></View>
                        </View>
                      </View>
                    : <View style={styles.view4}>
                        <Text style={styles.text3}>ราคารวม</Text>
                        <Text style={styles.text2}>มาเติมตรงนี้</Text>
                      </View>
                  }
                />
              </View>
            </View>
            <View style={{flex:0.02}}/>
          </LinearGradient>
      );}

}
