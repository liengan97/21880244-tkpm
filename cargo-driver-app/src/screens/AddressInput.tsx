import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

type Props = {
  placeholder?: string,
  onPressAddess: (lat: any, lng: any) => any
}

export const AddressInput = ({ placeholder, onPressAddess }: Props) => {

  const handlePressAddress = (data: any, details: any) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    onPressAddess(lat, lng);
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholder ? placeholder : 'Search'}
        fetchDetails={true}
        disableScroll={true}
        onPress={handlePressAddress}
        query={{
          key: 'AIzaSyAl-j5r73UAx9f8SycoOUjxNONj3nYeHIM',
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.inputContainer,
          textInput: styles.input
        }}
        onFail={(err) => console.error('DAUXANH', err)}
      />
    </View>
  );
};

// AIzaSyAl-j5r73UAx9f8SycoOUjxNONj3nYeHIM

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    backgroundColor: 'white'
  },
  input: {
    height: 48,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#F3F3F3'
  }
})