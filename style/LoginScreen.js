const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
    flex: 1,
  },
  circle: {
      backgroundColor: "#02E079",
      marginTop: 100,
      width: 140,
      height: 140,
      borderRadius: 140/2,
      shadowColor: 'rgba(0,0,0, .5)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 2, //IOS
      justifyContent: 'center',
      alignItems: 'center',
  },
  circle1: {
      backgroundColor: "#FFF",
      width: 130,
      height: 130,
      borderRadius: 130/2,
      justifyContent: 'center',
      alignItems: 'center',
  },
  circle2: {
      backgroundColor: "#02E079",
      width: 100,
      height: 100,
      borderRadius: 100/2,
      justifyContent: 'center',
      alignItems: 'center',
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  logoText: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 50,
    marginBottom: 30,
    textAlign: 'center',
    color: "#505050",
    //fontFamily: 'MontserratBold'
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,

  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
      backgroundColor: '#05DB75',
      paddingVertical: 15,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 20,
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      borderRadius: 10,

  },
  buttonText: {
      textAlign: "center",
      color: '#FFF',
      fontWeight:'700',
      fontSize: 17,
      fontFamily: 'MontserratBold'
  },
};