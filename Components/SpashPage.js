import React from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import database from "../Database/Database.js";
import styles from "../style/SprashScreen.js";

export default class SpashPage extends React.Component{
  componentDidMount() {
    this.onAsyncRead();
  }
  onAsyncRead=async ()=>{
    var account = await AsyncStorage.getItem('account_IMDEE');
    account = JSON.parse(account);
    setTimeout(()=>{
      if(account!='' && account!=null && account!=undefined){
        database.readCart(account.Email+':'+account.Phone);
        database.checkRestaurant(account.Email+':'+account.Phone);
        this.props.navigation.navigate('SecondScreen')
      }
      else{
        this.props.navigation.navigate('FirstScreen')
      }
    },1500)
  }
  render(){
    return (
      <View style={styles.container}>
      <View style={styles.circle}>
        <View style={styles.circle1}>
          <View style={styles.circle2}>
            <View style={styles.logoContainer}>
              <Image source={require('../image/box.png')} style={{width: 100, height: 100}}/>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.present}>Delivery Man</Text>
    </View>
    );
  }
}
