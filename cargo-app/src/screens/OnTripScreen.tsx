import { Dimensions, Text, View } from "react-native";
import CargoMap from './CargoMap';
import { useEffect, useState } from "react";

type Props = {
  pickupCords?: any,
  destinCords?: any,
  socket: any,
  onGoingTrip: any,
  onCompleteTrip: any
}

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function OnTripScreen({ socket, onGoingTrip, pickupCords, destinCords }: Props) {
  const [driverLocation, setDriverLocation] = useState<any>({latitude: 10.801497, longitude: 106.636930});

  useEffect(() => {
    socket.on('MY_CURRENT_LOCATION', (driverLocation: any) => {
      setDriverLocation(driverLocation);
      console.log('DRIVER LOCATION: ', driverLocation);
    })
  }, [])

  return (
    <View>
      <CargoMap
        // currentLoc={{latitude: 10.801497, longitude: 106.636930, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
        currentLoc={{...driverLocation, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
        originalLoc={pickupCords}
        destinationLoc={destinCords}
      />
      <View>
        <Text>Your driver is arriving</Text>
      </View>
      <View>
        <View>
          <Text>Nguyen Van A</Text>
          <Text>59P3-143.18</Text>
        </View>
        <View>
          <Text>Image here</Text>
        </View>
      </View>
    </View>
  )
}

