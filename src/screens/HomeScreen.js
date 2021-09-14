import React from "react";
import { View } from "react-native";

import GoogleMap from "../components/GoogleMap";
import SlideModal from "../components/SlideModal"

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <GoogleMap />
      <SlideModal />
    </View>
  );
}
