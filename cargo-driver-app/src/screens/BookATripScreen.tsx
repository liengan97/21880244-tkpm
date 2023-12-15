import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native"
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Button from "./Button";
import Images from '../constants/image'
import Car from "./Car";
import { GOOGLE_MAP_DIRECTION_API_KEY } from "@env";

const { width, height } = Dimensions.get('window');

const CAR_TYPES = [
  {
    id: 1,
    imagesSrc: Images.carIcon,
    name: 'Xe cua ong noi ne con',
    seats: 3,
    price: '2000 d'
  },
  {
    id: 2,
    imagesSrc: Images.carIcon,
    name: 'Xe cua ong noi ne con',
    seats: 4,
    price: '2000 d'
  },
  {
    id: 3,
    imagesSrc: Images.carIcon,
    name: 'Xe cua ong noi ne con',
    seats: 5,
    price: '2000 d'
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
  const [distance, setDistance] = useState<any>();
  const [duration, setDuration] = useState<any>();

  const handleClick = () => {
    onDone({
      staffOrUserId: 1,
      isStaff: false,
      fullName: 'Rider', // for testing
      phoneNumber: '096675675', // for testing
      identityCard: 435325325, // for testing
      seatNumber: 3, // for testing
      pickupAt: pickupCords,
      dropOffAt: destinCords,
      paymentMethod: 'Cash On Delivery',
      timePickup: new Date(),
      notesForDriver: null,
    })
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
          apikey={GOOGLE_MAP_DIRECTION_API_KEY}
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
                price={car.price}
                seats={car.seats}
                active={car.id === carId}
                onClick={setCarId}
              />
            ))}
          </ScrollView>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, marginBottom: 20, marginTop: 10 }}>
            <View>
              <View style={{ paddingVertical: 4 }}>
                <Text>Duration: {duration}</Text>
              </View>
              <View style={{ paddingVertical: 4 }}>
                <Text>Distance: {distance}</Text>
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