import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import NewTripRequestConfirmationDialog from './NewTripConfirmation';
import CargoMap from './CargoMap';
import { Location } from '../@types';
import { ArrowRight, Settings } from 'lucide-react-native';
import Spinner from './Spinner';
import { Popup, Toast } from 'react-native-popup-confirm-toast'
import useSocket from '../hooks/useSocket';

import { useUser } from '../hooks'
import OnTripScreen from './OnTripScreen';

type OnGoingTrip = {
  pickupLoc: Location,
  dropOffAt: Location
}

enum TripRequestAnswer {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export default function HomeScreen(props: any) {
  const [loading, setLoading] = useState(false);
  const { loading: loadingLocation, location } = useCurrentLocation();

  const { loading: loadingUser, email, isOnline, setOnline } = useUser();

  const [showTripConfirmation, setShowTripConfirmation] = useState(false);

  const [tripRequest, setTripRequest] = useState<any>();
  const [isOnTrip, setOnTrip] = useState(false);
  const [onGoingTrip, setOnGoingTrip] = useState<OnGoingTrip>()
  const [isTripAlmostCompleted, setDone] = useState(false);
  const [onTripRoom, setOnTripRoom] = useState<any>();

  const { socket, connected, isReconnecting, reconnectFailed } = useSocket();

  const [rooms, setRooms] = useState();

  const goOfflineHandler = () => {
    Popup.show({
      type: 'confirm',
      title: 'Do you want to go offline?',
      buttonText: 'Yes',
      confirmText: 'No',
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
      confirmButtonStyle: {
        borderColor: 'rgba(52, 52, 52, 0.2)',
        borderWidth: 1,
        borderRadius: 2,
        marginLeft: 2,
      },
      modalContainerStyle: {
        borderRadius: 2
      },
      callback: () => {
        handleGoOffline();
        Popup.hide();
      },
      cancelCallback: () => {
        Popup.hide();
      },
    })
  };

  const showToastOnlineNow = () => {
    Toast.show({
      // title: 'You\'re online now',
      title: 'YOU\'RE ONLINE NOW',
      // text: 'Click the icon at the top left corner of the screen if you want to go offline.',
      backgroundColor: '#157faf',
      timeColor: 'white',
      timing: 1000,
      position: 'top',
      statusBarType: 'dark-content',
      titleTextStyle: {
        paddingVertical: 15,
        textAlign: 'center',
        fontSize: 15,
      },
      descTextStyle: {
        lineHeight: 25,
        paddingBottom: 7
      },
      onCloseComplete: () => {
      },
      onOpenComplete: () => {
      },
    })
  }

  /**
   * Case(s)
   *   1. User is online and suddenly exist app and open app again
   *   2. Crash app
   *   3. Suddendly lost connection to the server (network issue, server issues)
   * @returns boolean
   */
  const needToReConnect = () => {
    return !loadingUser && isOnline && !isReconnecting && !socket.connected;
  }

  // Reconnecting after reopen app
  useEffect(() => {
    if (needToReConnect()) {
      socket.connect();
    }
  }, [isOnline]);

  // Golive after reconnecting if isOnline was set to TRUE
  useEffect(() => {
    if (connected && isOnline) {
      handleGoLive();
    }
  }, [connected])

  useEffect(() => {
    socket.on("TRIP_REQUEST_DRIVERS_CONFIRMATION", (msg) => {
      const { roomId, tripRequest } = msg;
      setTripRequest({
        ...tripRequest,
        roomId
      });
    });
    socket.on('START_TRIP', (msg) => {
      setOnTripRoom(msg.roomId);
      setOnGoingTrip(msg.trip);
      console.log('OK start trip', msg.trip);
    })
    socket.on('ALREADY_PICKEP_UP', (msg)=>{
      setTripRequest(null);
    })
    
  }, []);

  // useEffect(() => {
  //   if (isOnline) {
  //     const payload = {
  //       driverId: email,
  //       latitude: location?.latitude,
  //       longitude: location?.longitude
  //     }

  //     try {
  //       socket.emit('DRIVER_LOCATION_CHANGE', onTripRoom,  payload, (response: any) => {
  //         console.log('Sent latest location to server: ', response);
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  // }, [location]);

  useEffect(()=>{
    if(isOnline){
      const location = [
        {latitude:10.794176, logitude:106.636112},
        {latitude:10.793881, logitude:106.636498},
        {latitude:10.793923, logitude:106.637013},
        {latitude:10.793839, logitude:106.637313},
        {latitude:10.793249, logitude:106.637957},
        {latitude:10.791984, logitude:106.637657},
        {latitude:10.791014, logitude:106.637571},
        {latitude:10.789497, logitude:106.637485},
        {latitude:10.788696, logitude:106.637013},
        {latitude:10.787094, logitude:106.637141},
        {latitude:10.786293, logitude:106.636583},
        {latitude:10.785323, logitude:106.636626},
        {latitude:10.784691, logitude:106.636455},
        {latitude:10.782878, logitude:106.636283},
        {latitude:10.781276, logitude:106.635510},
        {latitude:10.780939, logitude:106.635167},
        {latitude:10.780770, logitude:106.634438},
        {latitude:10.780433, logitude:106.634051},
        {latitude:10.780096, logitude:106.633365},
        {latitude:10.779674, logitude:106.632807},
        {latitude:10.779337, logitude:106.632120},
        {latitude:10.779126, logitude:106.631391},
        {latitude:10.778915, logitude:106.630747},
        {latitude:10.778410, logitude:106.630103},
        {latitude:10.778367, logitude:106.630103},
        {latitude:10.777946, logitude:106.629459}
        ]
        let counter = 0;
        
      setInterval(()=>{
        const payload = {
                driverId: email,
                latitude: location[counter].latitude,
                longitude: location[counter].logitude
              }
  
        socket.emit('DRIVER_LOCATION_CHANGE', onTripRoom,  payload, (response: any) => {
                  console.log('Sent latest location to server: ', response);
                });
  
        counter++;
        if(counter == location.length){
          counter = 0;
        }
      }, 4000)
    }
  }, [isOnline])

  const handleGoLive = () => {
    setLoading(true);

    const payload = {
      driverId: email,
      latitude: location?.latitude,
      longitude: location?.longitude,
      rooms
    }

    try {
      if (!socket.connected) {
        socket.connect();
      }
      socket.emit('DRIVER_GO_LIVE', payload, (response: any) => {
        console.log('DRIVER_GO_LIVE_RESPONSE: ', response);
        setOnline(true);
        setLoading(false);
        showToastOnlineNow();
      })
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleGoOffline = () => {
    setLoading(true);

    try {
      socket.emit('DRIVER_GO_OFFLINE', (response: any) => {
        console.log('DRIVER_GO_OFFLINE_RESPONSE: ', response);
        setOnline(false);
        socket.disconnect();
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleRejectRequestedTrip = () => {
    answerTripRequest(TripRequestAnswer.REJECTED);
  }

  const handleAcceptRequestedTrip = () => {
    answerTripRequest(TripRequestAnswer.ACCEPTED);
  }

  const handleTimeout = () => {
    setTripRequest(null);
    setShowTripConfirmation(!showTripConfirmation);
  }

  const answerTripRequest = (answer: TripRequestAnswer) => {
    const payload = {
      answer,
      fromRoomId: tripRequest.roomId
    }

    socket.emit('TRIP_REQUEST_DRIVERS_CONFIRMATION_RESPONSE', payload, (response: any) => {
      console.log('ANSWER: ', response);
    })

    setTripRequest(null);
    setShowTripConfirmation(!showTripConfirmation);
  }

  if (loadingLocation) {
    return <Spinner />
  }


  if (onGoingTrip) {
    return <OnTripScreen driverLocation ={location} trip={onGoingTrip} />
  }

  return (
    <>
      {(!isOnline) && (
        <View style={{ position: 'absolute', bottom: 10, zIndex: 1, width: '100%', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', width: '95%' }}>
            <TouchableOpacity
              onPress={handleGoLive}
              style={{ display: 'flex', alignContent: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', padding: 17, backgroundColor: '#157faf', borderRadius: 3 }}
            >
              {loading && (
                <ActivityIndicator color="white" />
              )}

              {!loading && (
                <>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>GO ONLINE</Text>
                  <ArrowRight color='white' style={{ marginLeft: 5 }} />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!reconnectFailed && isOnline && (!connected || isReconnecting) && (
        <View style={{ position: 'absolute', backgroundColor: 'rgba(52, 52, 52, 0.9)', zIndex: 2, alignContent: 'center', alignItems: 'center', display: 'flex', padding: 6, justifyContent: 'center', height: '100%', width: '100%' }}>
          <View style={{ padding: 6 }}>
            <ActivityIndicator color='white' />
          </View>
          <Text style={{ color: 'white', paddingLeft: 4 }}>Reconnecting</Text>
        </View>
      )}

      <View style={{ zIndex: 1 }}>
        {isOnline && (
          <View style={{ position: 'absolute', left: 20, top: 20 }}>
            <TouchableOpacity onPress={goOfflineHandler} style={{ padding: 10, backgroundColor: '#157faf', borderRadius: 50 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 17 }}>Go Offline</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ position: 'absolute', right: 20, top: 20 }}>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()} style={{ padding: 10, backgroundColor: '#157faf', borderRadius: 50 }}>
            <Settings color='white' />
          </TouchableOpacity>
        </View>

      </View>

      {isTripAlmostCompleted && (
        <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', zIndex: 1 }}>
          <TouchableOpacity style={{ marginVertical: 30, backgroundColor: 'green', marginHorizontal: 20, alignItems: 'center', paddingVertical: 20, borderRadius: 2 }}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>COMPLETE TRIP</Text>
          </TouchableOpacity>
        </View>
      )}

      {location && (
        <CargoMap
          currentLoc={location}
          originalLoc={onGoingTrip?.pickupLoc}
          destinationLoc={onGoingTrip?.dropOffAt}
        />
      )}

      {tripRequest && !onGoingTrip && (
        <NewTripRequestConfirmationDialog
          trip={tripRequest}
          isHidden={showTripConfirmation}
          onAccept={handleAcceptRequestedTrip}
          onTimeout={handleTimeout}
          onReject={handleRejectRequestedTrip}
        />
      )}
    </>
  );
}
