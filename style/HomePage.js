const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
    flex: 1,
  },
  circle: {
      backgroundColor: "#02E079",
      marginTop: 20,
      width: 140,
      height: 140,
      borderRadius: 140/2,
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
  logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  logout: {
      alignItems:'flex-end',
      marginTop:'10%',
      marginRight:'5%',
  },
  obj: {
    flexDirection:'row',
    padding:5,
    paddingLeft:10,
    paddingRight:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFFFFF',
    borderRadius:100,
  },
  btnBase: {
    borderRadius:10,
    backgroundColor:'#FFFFFF',
    width:'100%',
    height:'100%',
    alignItems:'center',
    flexDirection:'column',
  },
  btnBoss: {
    borderRadius:10,
    backgroundColor:'#FFFFFF',
    width:'96%',
    height:'100%',
    alignItems:'center',
    flexDirection:'column',
  },
  mocup: {
    width:'60%',
    height:'10%',
    backgroundColor:'#FFFFFF',
    marginLeft:'20%',
    marginTop:'69%',
    borderRadius:10,
    flexDirection:'row',
    position:"absolute",
    zindex:2,
  },
  lol: {
    marginLeft:'5%',
    flex:0.75,
    marginTop:'5%',
    backgroundColor:'#FFFFFF',
    width:'90%',
    borderRadius:10,
  }
};