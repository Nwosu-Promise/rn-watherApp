import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

import {fetchLocationId, fetchWeather} from './utils/api';

import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';

const App = props => {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isWeather, setIsWeather] = useState('');
  const [isTemperature, setIsTemperature] = useState(0);

  const locationUpdateHandler = async city => {
    if (!city) return;

    // setLocation(city);
    const func = async () => {
      try {
        setIsLoading(true);
        const locationId = await fetchLocationId(city);
        const {location, weather, temperature} = await fetchWeather(locationId);
        setIsLoading(false);
        setIsError(false);
        setLocation(location);
        // console.log(location);

        setIsWeather(weather);
        setIsTemperature(temperature);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    func();
  };

  useEffect(() => {
    locationUpdateHandler('San Francisco');
  }, []);

  return (
    <KeyboardAvoidingView style={styles.screen} behaviour="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(isWeather)}
        style={styles.imageContainer}
        imageStyle={styles.image}>
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={isLoading} color="white" size="large" />
          {!isLoading && (
            <View>
              {isError && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city
                </Text>
              )}
              {!isError && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {isWeather}
                  </Text>
                  <Text
                    style={[styles.largeText, styles.textStyle]}>{`${Math.round(
                    isTemperature,
                  )}°`}</Text>
                </View>
              )}

              <SearchInput
                placeholder="Search any city"
                onSubmit={locationUpdateHandler}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});

export default App;
