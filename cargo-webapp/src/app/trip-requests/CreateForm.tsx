import { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import useAxiosAuth from "../lib/hooks/useAxiosAuth";
import Loading from "../components/Loading";
import Label from "../components/Label";
import Button from "../components/Button";
import useSocket from "../lib/hooks/useSocket";

import { Loader } from '@googlemaps/js-api-loader';
import InProgress from "../components/InProgress";
import { CargoBasicEventMessage, CargoEvent, CargoEventStatus } from "./Types";
import DriverInformation from "./DriverInformation";
import { useSession } from "next-auth/react";


export enum Action {
  CREATE,
  UPDATE
}

type Props = {
  onSaved: (values: any) => any,
  hideModal?: any
}

const CAR_SEATS = [
  {
    "label": "4 Seats",
    "value": 4
  },
  {
    "label": "6 Seats",
    "value": 6
  }
]

const containerStyle = {
  // width: '400px',
  // height: '100%'
  width: '100%',
  height: '600px'
};

const REQUEST_TRIP_ACK_TIMEOUT = 10000;

export default function CreateForm({ hideModal, onSaved }: Props) {
  const [fetching, setFetching] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [fullName, setFullName] = useState('Nguyen Thi Kim Ngan');
  const [phoneNumber, setPhoneNumber] = useState('84935525255');
  const [identityCard, setIdentityCard] = useState('0000434235');
  const [pickupLocation, setPickupLocation] = useState('Some where');
  const [dropOffLocation, setDropOffLocation] = useState('I do not know');
  const [vehicleType, setvehicleType] = useState(4);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [notesForDriver, setNotesForDriver] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(false);
  const [inprogress, setInProgress] = useState(false);
  const [message, setMessage] = useState('');
  const [showAcceptedDriverInfo, setShowAcceptedDriverInfo] = useState(false);
  const [ping, setPing] = useState(false);
  const [soketError, setSoketError] = useState<any>();
  const [showInprogressIcon, setShowInprogressIcon] = useState(true);

  const { socket } = useSocket();
  const { data } = useSession();

  const api = useAxiosAuth();

  const mapRef = useRef<any>();

  useEffect(() => {
    if (!mapRef) {
      return;
    }

    setFetching(true);

    const initMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyDc7PnOq3Hxzq6dxeUVaY8WGLHIePl0swY",
        version: 'weekly'
      })

      const { Map } = await loader.importLibrary("maps");

      const options: google.maps.MapOptions = {
        center: {
          lat: -3.745,
          lng: -38.523
        },
        zoom: 17,
        mapId: 'AIzaSyDWTx7bREpM5B6JKdbzOvMW'
      }
      new Map(mapRef.current, options);
    }

    initMap();
    setFetching(false);
  }, [fetching]);

  useEffect(() => {
    if (ping && soketError?.message?.startsWith('TokenExpiredError')) {
      api.get("/ping")
        .then(() => {
          setSoketError(null);
          socket.connect();
        })
        .catch((err) => console.error(err))
        .finally(() => setPing(false));
    }
  }, [ping])

  useEffect(() => {
    socket.io.opts.query = { accessToken: data?.user.accessToken };
    socket.connect();

    socket.emit('RIDER_GO_LIVE', (response: any) => {
      console.log(response);
    })

    socket.on('connect_error', (error) => {
      console.error(error, error.message);
      setSoketError(error);
      setPing(error?.message.startsWith('TokenExpiredError'));
    })

    socket.on("NO_DRIVERS_FOUND", (msg) => {
      setShowInprogressIcon(false);
      setMessage('No drivers are online to serve your request. Please try again later.');
    })

    return () => {
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
    socket.io.opts.query = { accessToken: data?.user.accessToken };
  }, [data?.user.accessToken])

  const handleSave = (e: SyntheticEvent) => {
    e.preventDefault();
  }

  const seekingADriver = useCallback(() => {
    setInProgress(true);
    setMessage('Seeking your driver');

    const payload = {
      isStaff: true,
      fullName,
      email: data?.user.email,
      phoneNumber,
      identityCard,
      seatNumber: vehicleType,
      pickupAt: {
        latitude: 10.794199,
        longitude: 10.794199
      },
      dropOffAt: {
        latitude: 10.794199,
        longitude: 10.794199
      },
      paymentMethod,
      timePickup: time,
      notesForDriver: null,
    };

    socket
      .timeout(REQUEST_TRIP_ACK_TIMEOUT)
      .emit(CargoEvent.FIND_DRIVER, payload, (error: any, event: CargoBasicEventMessage) => {
        if (error) {
          setInProgress(false);
          setError(error);
        } else {
          setMessage(event.message);
        }
      })

    socket.on(CargoEvent.FOUND_DRIVER, (event: CargoBasicEventMessage) => {
      const { message, status } = event;
      switch (status) {
        case CargoEventStatus.OK:
          setMessage(message);
          setInProgress(false);
          setShowAcceptedDriverInfo(true);
          break;
        case CargoEventStatus.INPROGRESS:
          setMessage(message)
          if (message.startsWith('A')) {
            setShowAcceptedDriverInfo(true);
          }
          break;
        default:
        // setError('Something went wrong');
      }
    });
  }, [])

  if (showAcceptedDriverInfo) {
    return (
      <DriverInformation
        driverName={message.driver.name}
        driverCarLicense={message.driver.carModel}
      />
    )
  }

  if (inprogress) {
    return (
      <InProgress showIcon={showInprogressIcon} message={message} width="1000px" height="536px" />
    )
  }

  if (fetching) {
    return (
      <Loading error={error} width="900px" height="500px" />
    )
  }

  return (
    <div className="p-4 sm:p-6 overflow-y-auto w-[1300px]">
      <div className="bg-blend-multiply"></div>
      <div className="mb-6">
        <h1 className="mb-2 text-xl font-bold text-gray-800 pb-6">
          Book a driver
        </h1>
      </div>
      <form onSubmit={handleSave} method="POST">
        <div className="flex bg-pink flex-row w-full h-full bg-white">
          <div className="flex-1 bg-red">
            <div className="flex flex-row">
              <div className="flex-1 pr-2">
                <div className="mb-6">
                  <Label htmlFor="fullName" required>Full Name</Label>
                  <Input id="fullName" onChange={setFullName} required value={fullName} />
                </div>

                <div className="mb-6">
                  <Label htmlFor="phoneNumber" required>Phone Number</Label>
                  <Input type="tel" id="phoneNumber" onChange={setPhoneNumber} required value={phoneNumber} />
                </div>

                <div className="mb-6">
                  <Label htmlFor="identityCard">Identity Card</Label>
                  <Input id="identityCard" onChange={setIdentityCard} required value={identityCard} />
                </div>

                <div className="mb-6">
                  <Label htmlFor="vehicleType" required>How many seats you need?</Label>
                  <select id="vehicleType" className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={vehicleType}
                    style={{ height: '46px' }}
                    required
                    onChange={(e) => setvehicleType(Number(e.target.value))}
                  >
                    <option value="">Choose number of seats</option>
                    {CAR_SEATS?.map((rol: any) => {
                      return <option key={rol.value} value={rol.value}>{rol.label}</option>
                    })}
                  </select>
                </div>

              </div>
              <div className="flex-1 pl-4">
                <div className="mb-6">
                  <Label htmlFor="pickupLocation" required>Where we can pickup you?</Label>
                  <Input id="pickupLocation" onChange={setPickupLocation} required value={pickupLocation} />
                </div>
                <div className="mb-6">
                  <Label htmlFor="dropOffLocation" required>Where you want to go?</Label>
                  <Input id="dropOffLocation" onChange={setDropOffLocation} required value={dropOffLocation} />
                </div>

                <div className="mb-6">
                  <Label htmlFor="paymentMethod">What type of payment method?</Label>
                  <Input disabled="disabled" id="paymentMethod" value="Cash on Delivery" required />
                </div>

                <div className="mb-6">
                  <Label htmlFor="timePickup">Time to pickup?</Label>
                  <Input type="datetime-local" id="timePickup" onChange={setTime} required />
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                rows={3}
                value={notesForDriver}
                onChange={(e) => setNotesForDriver(e.target.value)}
                className="border block w-full rounded-lg p-2.5"
                placeholder="Write something for your driver ..."
              />
            </div>
            <div className="w-[300px] pt-8">
              <Button onClick={seekingADriver}>Find</Button>
              {/* <Button type="submit" onClick={seekingADriver} disabled={loadingBtn}>
                {loadingBtn && (
                  <div className="flex">
                    <svg className="inline w-4 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <div>{'Seeking your driver'}</div>
                  </div>
                )}
                {!loadingBtn && (
                  <div className="flex items-center">
                    <span>Find</span>
                    <div className="pl-2">
                      <svg className="w-[16px] h-[16px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </div>
                  </div>
                )}
              </Button> */}
            </div>
          </div>
          <div className="flex-1 h-full pl-6">
            <div className="rounded" style={containerStyle} ref={mapRef}></div>
          </div>
        </div>
      </form>
    </div>
  )
}
