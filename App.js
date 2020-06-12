import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = props => {
  return (
    <View style={styles.screen}>
      <Text>App works</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
