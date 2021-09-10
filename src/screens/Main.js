import React from "react";
import { View } from "react-native";

import GoogleMap from "../components/GoogleMap";
import SlideModal from "../components/slideModal"

export default function Main({ navigation }) {
  return (
    <View>
      <GoogleMap />
      <SlideModal />
    </View>
  );
}
