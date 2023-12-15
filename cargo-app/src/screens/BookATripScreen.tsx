import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native"
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Button from "./Button";
import Images from '../constants/image'
import Car from "./Car";
import { useUser } from "../hooks";
import {GOOGLE_MAP_DIRECTIONS_API_KEY} from '@env'
import Spinner from "./Spinner";

const { width, height } = Dimensions.get('window');

const CAR_TYPES = [
  {
    id: 1,
    imagesSrc: Images.carIcon,
    name: 'Car 1',
    seats: 3,
    basePrice: 30000
  },
  {
    id: 2,
    imagesSrc: Images.carIcon,
    name: 'Car 2',
    seats: 4,
    basePrice: 55000
  },
  {
    id: 3,
    imagesSrc: Images.carIcon,
    name: 'Car 3',
    seats: 5,
    basePrice: 70000
  }
]

type Props = {
  pickupCords: any,
  destinCords: any,
  onDone: any,
  loading: boolean
}

export default function BookATripScreen({ pickupCords, destinCords, onDone, loading }: Props) {
  const mapRef = useRef<any>();
  const [carId, setCarId] = useState<any>();
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const { email } = useUser();

  const handleClick = () => {
    onDone({
      email,
      duration,
      distance,
      seatNumber: getSeats(),
      pickupAt: pickupCords,
      dropOffAt: destinCords,
      paymentMethod: 'Cash On Delivery',
      price: getPrice()
    })
  }

  const getSeats = () => {
    return CAR_TYPES.find(car => car.id == carId)?.seats;
  }

  const getPrice = () => {
    const car = CAR_TYPES.find(car => car.id == carId);
    return car?.basePrice ? (car.basePrice + 15000 + distance * 5000) : (15000 + distance * 5000);
  }

  if (!GOOGLE_MAP_DIRECTIONS_API_KEY) {
    return <Spinner />
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MapView ref={mapRef} style={StyleSheet.absoluteFill} initialRegion={pickupCords}>
          <Marker coordinate={pickupCords} pinColor={'orange'} />
          <Marker coordinate={destinCords} />
          <MapViewDirections
            origin={pickupCords}
            destination={destinCords}
            apikey={GOOGLE_MAP_DIRECTIONS_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)

              setDistance(result.distance);
              setDuration(result.duration);

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
        </MapView>
      </View>
      <View style={{ bottom: 0, flex: 1 }}>
        <View style={{ padding: 20, flex: 1 }}>
          <ScrollView
            style={{ borderBottomWidth: 0, borderBottomColor: 'gray' }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {CAR_TYPES.map(car => (
              <Car
                key={car.id}
                id={car.id}
                imageSrc={car.imagesSrc}
                name={car.name}
                price={car.basePrice + 15000 + distance * 5000}
                seats={car.seats}
                active={car.id === carId}
                onClick={setCarId}
              />
            ))}
          </ScrollView>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, marginBottom: 20, marginTop: 10 }}>
            <View>
              <View style={{ paddingVertical: 4 }}>
                <Text>Duration: {Math.round(duration)} m</Text>
              </View>
              <View style={{ paddingVertical: 4 }}>
                <Text>Distance: {distance} km</Text>
              </View>
            </View>
            <View style={{ paddingVertical: 4 }}>
              <Text>Payment: Cash on Delivery</Text>
            </View>
          </View>
          <View>
            <Button loading={loading} onPress={handleClick} styles={{ borderWidth: 0, borderRadius: 3 }} text='Book a trip' />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});