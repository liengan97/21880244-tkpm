import { Dimensions, Image, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_DIRECTIONS_API_KEY } from '@env';
import { useRef } from 'react';
import Images from '../constants/image';
import Spinner from './Spinner';

const { width, height } = Dimensions.get('window');

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

export default function CargoMap({ originalLoc, currentLoc, destinationLoc }: Props) {
  const mapRef = useRef<any>();

  if (!GOOGLE_MAP_DIRECTIONS_API_KEY) {
    return <Spinner />
  }

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={currentLoc ?? originalLoc} provider={PROVIDER_GOOGLE}>
        {originalLoc && (
          <Marker
            coordinate={{
              latitude: originalLoc.latitude,
              longitude: originalLoc.longitude,
            }}
          ><Image source={Images.womanIcon} /></Marker>
        )}

        {currentLoc && (
          <Marker
            coordinate={{
              latitude: currentLoc.latitude,
              longitude: currentLoc.longitude,
            }}
          ><Image source={Images.carIcon} /></Marker>
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

        {originalLoc && currentLoc && (
          <>
          <MapViewDirections
            origin={currentLoc}
            destination={originalLoc}
            apikey={GOOGLE_MAP_DIRECTIONS_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
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
            onError={(err) => console.error(err)}
          />
          <MapViewDirections
            origin={originalLoc}
            destination={destinationLoc}
            apikey={GOOGLE_MAP_DIRECTIONS_API_KEY}
            strokeWidth={4}
            strokeColor="green"
            optimizeWaypoints={true}
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
            onError={(err) => console.error(err)}
          />
          </>
        )}
      </MapView>
    </View>
  )
};