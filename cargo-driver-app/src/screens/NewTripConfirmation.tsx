import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { Dimensions } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

type Props = {
	trip: any;
	isHidden: boolean;
	onAccept: () => void;
	onReject: () => void;
	onTimeout: () => void;
	timeoutInSeconds?: number;
};

const windowHeight = Dimensions.get('window').height;

export default function NewTripRequest({ trip, onTimeout, onAccept, onReject, timeoutInSeconds, isHidden }: Props) {
	const [ counter, setCounter ] = useState(10);
	const isTimeout = counter <= 0;
	const animatedBounceValue = new Animated.Value(windowHeight);

	const { pickupAt } = trip || {};

	useEffect(
		() => {
			if (isTimeout) {
				onTimeout();
				return;
			}

			const timerId: any =
				!isTimeout &&
				setInterval(() => {
					setCounter((val) => val - 1);
				}, 1000);

			return () => clearInterval(timerId);
		},
		[ isTimeout ]
	);

	useEffect(
		() => {
			let total = windowHeight;

			if (isHidden) {
				total = 0;
			}

			Animated.spring(animatedBounceValue, {
				toValue: total,
				velocity: 3,
				tension: 2,
				friction: 8,
				useNativeDriver: true
			}).start();
		},
		[ isHidden ]
	);

	console.log('OK here we go');

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					{
						...styles.subView,
						height: windowHeight
					},
					{ transform: [ { translateY: animatedBounceValue } ] }
				]}
			>
				<View style={{ height: '100%', backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<ProgressCircle
							percent={counter / 10 * 100}
							radius={50}
							borderWidth={5}
							shadowColor="white"
							color="green"
							bgColor="#fff"
						>
							<Text style={{ fontSize: 25, fontWeight: 'bold' }}>{counter}</Text>
						</ProgressCircle>
					</View>

					<View style={{ backgroundColor: '#f6f6f6' }}>
						<View style={{ padding: 10 }}>
							<View
								style={{
									marginTop: 10,
									backgroundColor: 'white',
									marginBottom: 10,
									padding: 10,
									display: 'flex',
									flexDirection: 'row',
									borderRadius: 2,
									borderWidth: 2,
									borderColor: '#f3f3f3'
								}}
							>
								<View>
									<MapPin color="green" />
								</View>
								<View style={{ paddingLeft: 10 }}>
									<Text style={{ fontWeight: 'bold', paddingBottom: 5 }}>Pickup from</Text>
									<Text>60 Dân Tộc, Tân Thành, Tân Phú, Thành phố Hồ Chí Minh</Text>
								</View>
							</View>

							<View
								style={{
									paddingTop: 5,
									paddingBottom: 5,
									alignContent: 'center',
									display: 'flex',
									flexDirection: 'row'
								}}
							>
								<TouchableOpacity
									style={{
										padding: 14,
										backgroundColor: 'green',
										borderRadius: 2,
										flex: 1,
										marginRight: 5
									}}
									onPress={onAccept}
								>
									<Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
										Accept
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={{
										padding: 14,
										borderRadius: 2,
										flex: 1,
										marginLeft: 5,
										borderWidth: 1,
										borderColor: 'red'
									}}
									onPress={onReject}
								>
									<Text style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
										Reject
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Animated.View>
		</View>
	);
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 9999
		// height: windowHeight,
		// zIndex: 2,
	},
	subView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0
		// zIndex: 9999999999
	}
});
