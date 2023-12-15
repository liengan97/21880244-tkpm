import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useUser } from '../hooks';
import useSocket from '../hooks/useSocket';
import BookATripScreen from '../screens/BookATripScreen';
import OnTripScreen from '../screens/OnTripScreen';
import { MessageCircle } from 'lucide-react-native';
import { Popup } from 'react-native-popup-confirm-toast';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

enum TripRequestStatus {
	NOT_READY,
	REQUESTED_AND_WATING_FOR_DRIVERS,
	ON_GOING,
	COMPLETED
}

type Props = {
	route: any;
};

export default function TripContainer({ route }: Props) {
	// const { pickupLoc: pickupCords, destinLoc: destinCords }: any = route.params || {};

	// TEST START
	const pickupCords = {
		latitude: 10.8068546,
		longitude: 106.6655378
	};

	const destinCords = {
		latitude: 10.7942583,
		longitude: 106.6350572
	};
	// TEST END

	const [ loading, setLoading ] = useState(false);
	const { socket, isReconnecting, connected } = useSocket();
	const { loading: loadingUser } = useUser();
	const [ onGoingTrip, setOnGoingTrip ] = useState<any>();
	const [ tripStatus, setTripStatus ] = useState<TripRequestStatus>(TripRequestStatus.NOT_READY);

	useEffect(() => {
		socket.on('NO_DRIVERS_FOUND', (msg) => {
			setLoading(false);
			Popup.show({
				type: 'warning',
				title: 'All drivers are busy now.',
				textBody: 'Sorry for this inconvience . Please try again later.',
				buttonText: 'OK',
				duration: 0,
				buttonContentStyle: {
					display: 'flex',
					flexDirection: 'row'
				},
				okButtonStyle: {
					backgroundColor: '#157faf',
					borderRadius: 2,
					marginRight: 2
				},
				confirmButtonStyle: {
					borderColor: 'rgba(52, 52, 52, 0.2)',
					borderWidth: 1,
					borderRadius: 2,
					marginLeft: 2
				},
				modalContainerStyle: {
					borderRadius: 2
				},
				callback: () => {
					Popup.hide();
				}
			});
		});

		socket.on('FOUND_DRIVER', (msg) => {
			console.log('Found a driver: ', msg);
		});
	}, []);

	useEffect(
		() => {
			if (needToReConnect()) {
				socket.connect();
			}
		},
		[ tripStatus ]
	);

	useEffect(
		() => {
			if (connected && isTripInProgress()) {
				connectToServer();
			}
		},
		[ connected ]
	);

	const isTripInProgress = () => {
		return [
			TripRequestStatus.NOT_READY,
			TripRequestStatus.ON_GOING,
			TripRequestStatus.REQUESTED_AND_WATING_FOR_DRIVERS
		].includes(tripStatus);
	};

	const needToReConnect = () => {
		return !loadingUser && isTripInProgress() && !isReconnecting && !socket.connected;
	};

	const connectToServer = () => {
		try {
			if (!socket.connected) {
				socket.connect();
			}
			socket.emit('RIDER_GO_LIVE', (response: any) => {
				console.log('RIDER_GO_LIVE_RESPONSE: ', response);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const requestATrip = (values: any) => {
		setLoading(true);
		socket.emit('FIND_DRIVER', values, (response: any) => {
			setTripStatus(TripRequestStatus.REQUESTED_AND_WATING_FOR_DRIVERS);
		});
	};

	if ([ TripRequestStatus.NOT_READY, TripRequestStatus.REQUESTED_AND_WATING_FOR_DRIVERS ].includes(tripStatus)) {
		return (
			<BookATripScreen
				loading={loading}
				pickupCords={{ ...pickupCords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
				destinCords={{ ...destinCords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
				onDone={requestATrip}
			/>
		);
	}

	if (tripStatus == TripRequestStatus.COMPLETED) {
		return null;
	}

	return null;
}