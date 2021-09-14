import React from "react";
import { View } from "react-native";

import GoogleMap from "../components/GoogleMap";
import SlideModal from "../components/SlideModal"
import { color } from "../config/globalStyles";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <GoogleMap />
      <SlideModal />
    </View>
  );
}
