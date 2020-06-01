import {AsyncStorage} from 'react-native'
import React, { Component } from "react";

  async function getHeaders() {
    try {
      let value = await AsyncStorage.getItem('TOKEN');
      if (value !== null) {
        let RequestHeaderComom = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': value
      }
        return RequestHeaderComom
      }
       
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}
  
export {getHeaders};