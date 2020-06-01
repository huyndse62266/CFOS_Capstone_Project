import {
    StyleSheet, Dimensions
} from 'react-native';
import { Row } from 'native-base';
const { width } = Dimensions.get("window");
const {height} = Dimensions.get('window')
const StyleOnboard = StyleSheet.create({
    content1:{
       flexDirection: 'column',
      
    },
    content2:{
        height: 180,
        width: width,
        
        padding : 35
        
    },
    content22:{
        height: 180,
        //  marginTop : 30,
        padding : 35
        
    },
    contenWelcome:{
        marginTop : -70,
        padding : 20
    },
    content3 :{
        marginTop : 50,
        padding : 20
    },
      picture:{
          marginTop : 30,
          height: 280,
          width:width,
      },
      picture3:{
        marginTop : 30,
      },
      pictureWelcome:{
        marginTop : -86,
        marginLeft : -90
      },
      text:{
          fontSize : 28
      },
      textWelcome:{
        fontSize : 28,
      fontWeight:"bold",
      
      },
      title1:{
          left: 15,
          flex:1
      },
      text2:{
        fontSize: 20,
        flex:2
    },
    text4:{
        fontSize : 15
    },
    text3:{
        color : '#FF331C',
        fontSize : 28
    },
    button:{
        backgroundColor : '#FF331C',
        borderRadius : 10
    },
    footer:{
        marginTop : 50,
        flexDirection : "row",
        justifyContent : "space-between",
        padding : 30
        
    },
    footer3:{
        marginTop : 50,
        flexDirection : "row",
        justifyContent : "center",
        padding : 30
        
    },
    footerWelcome:{
        justifyContent : "center",
        padding : 30,
        flexDirection: 'column',
        alignItems : 'center',
        
       
    },
    signUp:{
        justifyContent : "center",
        alignItems : 'center',
        backgroundColor : '#FF331C',
        borderRadius : 10,
        width : 286,
        height : 45,
      
    },
    textSignUp :{
        color : 'white',
        fontSize : 18,
        fontFamily : 'Roboto',
        fontWeight : 'bold'
    },
    textSignIn :{
        color : '#FF331C',
        fontSize : 16,
        fontFamily : 'Roboto',
        fontWeight : 'bold'
    },
    signIn:{
        justifyContent : "center",
        borderWidth: 2,
        alignItems : 'center',
        backgroundColor : 'white',
        borderColor: '#FF331C',
        borderRadius : 10,
        width : 286,
        height : 45,
        marginTop : 10
    },
    notiMess:{
        textAlign: 'center',
        paddingTop: height/7
      },
      forget:{
        textAlign: 'center',
        paddingTop: 10
      }

  
    });
export default StyleOnboard;