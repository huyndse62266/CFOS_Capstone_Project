import { AsyncStorage } from "react-native";
const baseUrl = "http://103.79.143.240:8080/api/";
const apiGetTracsaction = "http://103.79.143.240:8080/api/transaction/customer";
async function apiGetTransactions() {
  let value = await AsyncStorage.getItem("TOKEN");
  try {
    let response = await fetch(apiGetTracsaction, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: value
      }
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}
async function apiCountNoti() {
  let value = await AsyncStorage.getItem("TOKEN");
  try {
    let response = await fetch(baseUrl + "countNoti", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: value
      }
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
}
async function apiChangeNoti() {
  let value = await AsyncStorage.getItem("TOKEN");
  try {
    let response = await fetch(baseUrl + "changeNoti", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: value
      }
    });

    return response.text(); //status
  } catch (error) {
    console.error(`Error is : ${error} + ${JSON.stringify(params)}`);
  }
}
export { apiGetTransactions, apiCountNoti, apiChangeNoti };
