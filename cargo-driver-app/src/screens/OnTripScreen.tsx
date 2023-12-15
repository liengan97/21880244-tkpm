import { Text, View } from 'react-native';
import CargoMap from './CargoMap';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type Props = {
	driverLocation: any;
	trip: any;
};

export default function OnTripScreen({ driverLocation, trip }: Props) {
	trip.pickLat = parseFloat(trip.pickLat);
	trip.pickLong = parseFloat(trip.pickLong);
	trip.desLat = parseFloat(trip.desLat);
	trip.desLong = parseFloat(trip.desLong);

	return (
		<View>
			<CargoMap
				currentLoc={{
					latitude: driverLocation.latitude,
					longitude: driverLocation.longitude,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA
				}}
				originalLoc={{
					latitude: trip.pickLat,
					longitude: trip.pickLong,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA
				}}
				destinationLoc={{
					latitude: trip.desLat,
					longitude: trip.desLong,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA
				}}
			/>
			<View>
				<Text>YOUR ARE ON TRIP</Text>
			</View>
		</View>
	);
}
