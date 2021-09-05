import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { Svg } from 'react-native-svg'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.Poplace}>
        Poplace
      </Text>
      <TouchableOpacity onPress={() => alert("login")} style={styles.button}>
        <Text style={styles.buttonText}>signin with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Poplace: {
    marginTop: "6%",
    width: "76%",
    height: "60%",
    borderWidth: 1,
    color: '#000000',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 34,
    fontWeight: '700',
  },
  button: {
    marginTop: "13%",
    width: "76%",
    height: "10.8%",
    borderColor: '#f78582',
    backgroundColor: '#f78582',
    borderRadius: 32,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 65,
    textAlign: 'center',
  },
});
