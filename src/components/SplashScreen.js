import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
const splashScreenImage = require('../assets/images/splashScreen.png');
const SplashScreen = () => {
  return (
    <View style={styles.splashScreenContainer}>
      <View style={styles.splashScreenImageBox}>
        <Image source={splashScreenImage} style={styles.splashScreenImage} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashScreenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  splashScreenImageBox: {
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    borderRadius: 50,
    marginTop: 100,
  },
  splashScreenImage: {
    width: 300,
    height: 300,
    borderColor: 'black',
    borderWidth: 1,
  },
});
