import React, { useState, useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import { useUser } from "../hooks";
import useSocket from "../hooks/useSocket";
import BookATripScreen from "../screens/BookATripScreen";
import OnTripScreen from "../screens/OnTripScreen";
import { Popup } from "react-native-popup-confirm-toast";

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

type OnGoingTrip = {
  roomId: string,
  driver: any,
  tripRequest: any
}

type Props = {
  route: any
}

export default function TripContainer({ route }: Props) {
  // const { pickupLoc: pickupCords, destinLoc: destinCords }: any = route.params || {};

  const pickupCords = {
    latitude: 10.782778, longitude: 106.637214
  }

  const destinCords = {
    latitude: 10.791936, longitude: 106.699026
  }

  const [loading, setLoading] = useState(false);
  const { socket, isReconnecting, connected } = useSocket();
  const { loading: loadingUser } = useUser();
  const [onGoingTrip, setOnGoingTrip] = useState<OnGoingTrip>();
  const [tripStatus, setTripStatus] = useState<TripRequestStatus>(TripRequestStatus.NOT_READY);

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
          flexDirection: 'row',
        },
        okButtonStyle: {
          backgroundColor: '#157faf',
          borderRadius: 2,
          marginRight: 2
        },
        modalContainerStyle: {
          borderRadius: 2
        },
        callback: () => {
          Popup.hide();
        }
      })
    })

    socket.on('FOUND_DRIVER', ({message}) => {
      setOnGoingTrip({
        driver: message.driver,
        roomId: message.roomId,
        tripRequest: message.tripRequest
      })
      setTripStatus(TripRequestStatus.ON_GOING);
    })
  }, [])

  useEffect(() => {
    if (needToReConnect()) {
      socket.connect();
    }
  }, [tripStatus]);

  useEffect(() => {
    if (connected && isTripInProgress()) {
      connectToServer();
    }
  }, [connected])

  const isTripInProgress = () => {
    return [
      TripRequestStatus.NOT_READY,
      TripRequestStatus.ON_GOING,
      TripRequestStatus.REQUESTED_AND_WATING_FOR_DRIVERS
    ].includes(tripStatus);
  }

  const needToReConnect = () => {
    return !loadingUser && isTripInProgress() && !isReconnecting && !socket.connected;
  }

  const connectToServer = () => {
    try {
      if (!socket.connected) {
        socket.connect();
      }
      socket.emit('RIDER_GO_LIVE', (response: any) => {
        console.log('RIDER_GO_LIVE_RESPONSE: ', response);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const findDriver = (values: any) => {
    setLoading(true);
    socket.emit("FIND_DRIVER", values, (response: any) => {
      setTripStatus(TripRequestStatus.REQUESTED_AND_WATING_FOR_DRIVERS);
    });
  }

  if ([TripRequestStatus.NOT_READY, TripRequestStatus.REQUESTED_AND_WATING_FOR_DRIVERS].includes(tripStatus)) {
    return (
      <BookATripScreen
        loading={false}
        pickupCords={{ ...pickupCords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
        destinCords={{ ...destinCords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
        onDone={findDriver}
      />
    )
  }

  if (tripStatus == TripRequestStatus.COMPLETED) {
    return (
      <View>
        <Text>Your trip has completed</Text>
      </View>
    );
  }

  return (
    <OnTripScreen
      socket={socket}
      onCompleteTrip={null}
      onGoingTrip={onGoingTrip}
      pickupCords={{ ...pickupCords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
      destinCords={{ ...destinCords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
    />
  )
}
