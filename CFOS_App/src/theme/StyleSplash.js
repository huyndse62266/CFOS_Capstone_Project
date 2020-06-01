import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const StyleSplash = StyleSheet.create({
  container: {
    backgroundColor: "white",

    flex: 1,
    // flexDirection:'column',
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: "white"
  },
  logo: {
    width: 128,
    height: 56
  },
  button: {
    width: width / 3,
    height: width / 3,
    backgroundColor: "#FF331C",
    justifyContent: "center",
    alignItems: "center",
    shadowColor:"#FF331C",
    borderRadius: 10,
    borderWidth: 0

  },
  text1:{
    fontSize : 35,
    fontFamily : 'Roboto',
    color : 'white',
    fontWeight : '900',
    textAlign : 'center'
  },
  text2:{
    fontSize :  40,
  },
  image:{
    width : width,
    height: height
   
  }
});
export default StyleSplash;
