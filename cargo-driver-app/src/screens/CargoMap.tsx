import { useRef } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import image from '../constants/image';
import { GOOGLE_MAP_DIRECTION_API_KEY } from '@env';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%'
  },
});

type Props = {
  currentLoc: any
  originalLoc?: any
  destinationLoc?: any
}

const { width, height } = Dimensions.get('window');

export default function CargoMap({ originalLoc, currentLoc, destinationLoc }: Props) {
 const mapRef = useRef<any>()
  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={currentLoc} provider={PROVIDER_GOOGLE}>
        {originalLoc && (
          <Marker
            coordinate={{
              latitude: originalLoc.latitude,
              longitude: originalLoc.longitude,
            }}
            title="Your start location"
          ><Image source={image.womanPickAtIcon} /></Marker>
        )}

        {currentLoc && (
          <Marker
            coordinate={{
              latitude: currentLoc.latitude,
              longitude: currentLoc.longitude,
            }}
          ><Image source={image.carIcon} /></Marker>
        )}

        {destinationLoc && (
          <Marker
            coordinate={{
              latitude: destinationLoc.latitude,
              longitude: destinationLoc.longitude,
            }}
            title="Your destination"
          />
        )}

        {originalLoc && destinationLoc && (
          <MapViewDirections
          origin={currentLoc}
          destination={originalLoc}
          apikey={GOOGLE_MAP_DIRECTION_API_KEY}
          strokeWidth={4}
          strokeColor="green"
          optimizeWaypoints={true}
          onStart={(params) => {
            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
          }}
          onReady={result => {
            console.log(`Distance: ${result.distance} km`)
            console.log(`Duration: ${result.duration} min.`)

            mapRef?.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: (width / 20),
                bottom: (height / 20),
                left: (width / 20),
                top: (height / 20),
              }
            });
          }}
        />
        )}
      </MapView>
    </View>
  )
};