import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, 
    Image, StatusBar, LayoutAnimation, Dimensions, Alert, AsyncStorage, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import * as firebase from "firebase";
import styles from "../style/LoginScreen.js";
import database from "../Database/Database.js";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default class LoginPage extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        user: "",
        password: "",
        pixel: Dimensions.get("window"),
        errorMessage: null,
        secureChange:true,
    };

    handleLogin = async () => {
        if(this.state.user.length>0 && this.state.password.length>0){
          const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)

          if(status !== 'granted'){
            Alert.alert('คุณสามารถเปิดแจ้งเตือนแอพได้ในตั้งค่า')
            return;
          }

          //const token = await Notifications.getExpoPushTokenAsync();
          var pass = await Crypto.digestStringAsync(
              Crypto.CryptoDigestAlgorithm.SHA256, this.state.password
          );

          var account = {
            Username : this.state.user,
            Password : pass.substring(0,32)
          };

          database.loginAccount(account, "ExponentPushToken[5YrjEGCdfDlrW0SNKZeyMy]", this.loginAccount_success, this.loginAccount_fail);
          console.log("password decrypt: " + this.state.password);
        }
        else
          Alert.alert("กรอกข้อมูลให้ครบถ้วน");
    };
    
    loginAccount_success = async (account) =>{
      await database.readCart(account.Email+':'+account.Phone);
      await database.checkRestaurant(account.Email+':'+account.Phone);
      await AsyncStorage.setItem("account_IMDEE", JSON.stringify(account));
      this.props.navigation.navigate("SecondScreen");
    }

    loginAccount_fail = (state) =>{
      if(state==1){
        Alert.alert("ไม่พบอีเมลหรือเบอร์โทรนี้");
        this.setState({user: ''});
      }
      else if(state==2){
        Alert.alert("รหัสผ่านผิด");
        this.setState({password: ''});
      }
      else if(state==3){
        Alert.alert("บัญชีนี้ถูกใช้อยู่แล้วบนอุปกรณ์อื่น");
        this.setState({user: '', password: ''});
      }
    }
    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <StatusBar barStyle="dark-content" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>

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

                    <Text style={styles.logoText}>Imdee Delivery</Text>
                    <TextInput 
                        placeholder="Username" 
                        keyboardType='email-address' 
                        autoCapitalize="none" 
                        autoCorrect={false} 
                        placeholderColor="#c4c3cb" 
                        style={styles.loginFormTextInput} 
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={user => this.setState({ user })}
                        value={this.state.user}
                    />
                    <TextInput 
                        placeholder="Password" 
                        placeholderColor="#c4c3cb" 
                        style={styles.loginFormTextInput} 
                        secureTextEntry={true}
                        autoCorrect={false}
                        returnKeyType="go"
                        ref={(input) => this.passwordInput = input}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.handleLogin}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}
