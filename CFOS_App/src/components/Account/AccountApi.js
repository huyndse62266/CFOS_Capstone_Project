//file chứa các api về account
import React, { Component } from "react";
import {
  AppRegistry,
  SectionList,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  AsyncStorage
} from "react-native";
const url = "http://103.79.143.240:8080/";



const apiGetAccountInfo = url + "api/customer/info";
const apiUpdateAccountInfo = url + "api/customer/edit";
const apiGetFeedbackInfo = url + "api/customer/all-feedback";
const urlGetFoodNear = url + "api/customer/food-near";
const apiUpdateToken = url + "api/customer/device-token?deviceToken=";
const urlChangePassword = url + "api/edit-password";
const ulrDeactiveCart = url + "api/customer/deactive-card?password=";


async function apiGetAccount() {
  let value = await AsyncStorage.getItem("TOKEN");
  try {
    let response = await fetch(apiGetAccountInfo, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: value
      }
    });

    let responseJson = await response.json();
    return responseJson; //account info
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function apiUpdateAccount(params) {
  let value = await AsyncStorage.getItem("TOKEN");
  try {
    let response = await fetch(apiUpdateAccountInfo, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: value
      },

      body: JSON.stringify(params)
    });
    //  let responseJson = await response.json();
    return response.text(); //status
  } catch (error) {
    console.error(`Error is : ${error} + ${JSON.stringify(params)}`);
  }
}
async function apiUpdateDeviceToken(params, token) {
  try {
    let response = await fetch(apiUpdateToken, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },

      body: params.deviceToken
    });

    return response.text(); //status
  } catch (error) {
    console.error(`Error is : ${error} + ${JSON.stringify(params)}`);
  }
}
async function apiGetFeedback() {
  let value = await AsyncStorage.getItem("TOKEN");

  try {
    let response = await fetch(apiGetFeedbackInfo, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: value
      }
    });
    let responseJson = await response.json();
    return responseJson; //account info
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}
async function apiChangePassword(params) {
  let value = await AsyncStorage.getItem("TOKEN");
  try {
    let response = await fetch(urlChangePassword, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: value
      },
      body: JSON.stringify(params)
    });
    //let responseJson = await response.json();
    return response.text(); //message
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function apiGetFoodNear() {
  let value = await AsyncStorage.getItem("TOKEN");

  try {
    let response = await fetch(urlGetFoodNear, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: value
      }
    });
    let responseJson = await response.json();
    return responseJson; //account info
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}

async function apiDeactive(password) {
  let value = await AsyncStorage.getItem("TOKEN");
let urlNew = ulrDeactiveCart+password.oldPassword;

  try {
    let response = await fetch(urlNew, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: value
      }
    });
    // let message = await response.toString;
    return response.text(); //account info
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}
export {
  apiGetAccount,
  apiUpdateAccount,
  apiGetFeedback,
  apiUpdateDeviceToken,
  apiChangePassword,
  apiGetFoodNear,
  apiDeactive
};
