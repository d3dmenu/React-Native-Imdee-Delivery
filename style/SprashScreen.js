const React = require("react-native");

const { StyleSheet } = React;

export default {

    container: {
        flex: 1,
        backgroundColor: '#02E079',
        alignItems: 'center',
        justifyContent: 'center',
      },
      circle: {
        backgroundColor: "#02E079",
        width: 180,
        height: 180,
        borderRadius: 180/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle1: {
        backgroundColor: "#FFF",
        width: 170,
        height: 170,
        borderRadius: 170/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle2: {
        backgroundColor: "#02E079",
        width: 140,
        height: 140,
        borderRadius: 140/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    present: {
      fontSize: 20,
      fontWeight: '700',
      marginTop: 10,
      color: "#FFF"
    }
};