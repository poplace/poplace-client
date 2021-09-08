import React from "react";
import { View } from "react-native";

import GoogleMap from "../components/GoogleMap";

export default function Main({ navigation }) {
  return (
    <View>
      <GoogleMap />
    </View>
  );
}
