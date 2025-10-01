import React from "react";
import { WebView } from "react-native-webview";

const PaymentWebView = ({ route, navigation }) => {
  const { redirectUrl, course } = route.params;

  return (
    <WebView
      source={{ uri: redirectUrl }}
      style={{ flex: 1 }}
      javaScriptEnabled
      onNavigationStateChange={(navState) => {
        if (navState.url.includes("status_code=200")) {
          navigation.replace("DetailOnlineCourse", { course });
        }
      }}
    />
  );
};

export default PaymentWebView;
