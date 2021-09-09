import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import Main from "../screens/Main";
import MyPage from "../screens/MyPage";
import NewPin from "../screens/NewPin";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: () => <Ionicons name="home-outline" size={32} />,
        }}
      />
      <Tab.Screen
        name="NewPin"
        component={NewPin}
        options={{
          tabBarIcon: () => <AntDesign name="plus" size={32} />,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={32} />,
          title: "마이페이지",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#453536",
            textAlign: "center",
            fontWeight: "700",
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.settingContainer}
              activeOpacity={1}
              onPress={() => console.log("설정페이지로..")}>
              <Ionicons name="settings-sharp" size={26} color="#766162" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  settingContainer: {
    flex: 1,
    justifyContent: "center",
    right: "10%",
  }
});
