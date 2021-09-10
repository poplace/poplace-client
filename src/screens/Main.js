import React from "react";
import { useSelector } from "react-redux";
import { Text } from "react-native";
import { selectUser } from "../features/userSlice";

export default function Main({ navigation }) {
  const status = useSelector(state => state.user.status);
  const userInfo = useSelector(selectUser);

  return (
    <Text>this is Main Page</Text>
  );
}
