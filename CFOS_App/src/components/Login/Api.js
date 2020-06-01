//file chứa các api về account
import React, { Component } from "react";
import {
  AppRegistry,
  SectionList,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform
} from "react-native";
const url = 'http://103.79.143.240:8080/'
const apiPostLogin = url + "api/user/login";
const apiPostSignUp = url + "api/auth/sign-up";
const apiForgot = url + "api/reset-password";
let requestHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

async function apiLogin(params) {
  try {
    let response = await fetch(apiPostLogin, {
      method: "POST",
      headers: requestHeaders,
      // body: params

      body: JSON.stringify(params)
    });
    //  let responseJson = await response.json();
    return response.headers.get("Authorization"); //token
  } catch (error) {
    console.error(`Error is : ${error} + ${JSON.stringify(params)}`);
  }
}
async function apiSignUp(params) {
  try {
    let response = await fetch(apiPostSignUp, {
      method: "POST",
      headers: requestHeaders,
      // body: params

      body: JSON.stringify(params)
    });
    return response.status;
  } catch (error) {
    console.error(`Error is : ${error} + ${JSON.stringify(params)}`);
  }
}

async function apiForgotPassword(params) {
  try {
    let response = await fetch(apiForgot, {
      method: "PUT",
      headers: requestHeaders,
      // body: params

      body: JSON.stringify(params)
    });
    return response.status;
  } catch (error) {
    console.error(`Error is : ${error} + ${JSON.stringify(params)}`);
  }
}
export { apiLogin, apiSignUp,apiForgotPassword};
