import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';

const SearchInput = props => {
  const [isText, setIsText] = useState('');
  const {placeholder} = props;

  const changeTextHandler = newLocation => {
    // props.location = newLocation;
    setIsText(newLocation);
  };

  const submitEditHandler = () => {
    const {onSubmit} = props;
    if (!isText) return;

    onSubmit(isText);
    setIsText('');
  };
  return (
    <View style={styles.screen}>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor="white"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={changeTextHandler}
        onSubmitEditing={submitEditHandler}
      />
    </View>
  );
};

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#666',
    height: 40,
    width: 300,
    marginTop: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  textInput: {
    color: 'white',
    flex: 1,
  },
});

export default SearchInput;
