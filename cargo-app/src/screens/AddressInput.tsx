import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_PLACES_API_KEY } from '@env'
import { debounce } from "lodash";
import Spinner from './Spinner';

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

  const handler = useCallback(debounce(handlePressAddress, 2000), []);

  if (!GOOGLE_MAP_PLACES_API_KEY) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholder ? placeholder : 'Search'}
        fetchDetails={true}
        disableScroll={true}
        onPress={handler}
        query={{
          key: GOOGLE_MAP_PLACES_API_KEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.inputContainer,
          textInput: styles.input
        }}
        onFail={(err) => console.error(err)}
      />
    </View>
  );
};

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