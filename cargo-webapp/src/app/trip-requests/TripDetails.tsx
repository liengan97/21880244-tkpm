import { SyntheticEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import useAxiosAuth from "../lib/hooks/useAxiosAuth";
import Loading from "../components/Loading";
import Label from "../components/Label";
import Button from "../components/Button";
import useSocket from "../lib/hooks/useSocket";
import Badge from "../components/Badge";

export enum Action {
  CREATE,
  UPDATE
}

type Props = {
  onSaved: (values: any) => any,
  hideModal?: any
  tripRequestIdOrName?: string | null
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

export default function TripDetails({ hideModal, tripRequestIdOrName, onSaved }: Props) {
  const [fetching, setFetching] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [identityCard, setIdentityCard] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [vehicleType, setvehicleType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(false);

  const { socket } = useSocket();

  const api = useAxiosAuth();

  useEffect(() => {
    setTimeout(() => {
      setFetching(false);
    }, 3000);
  }, [])

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  }, []);

  const isUpdateMode = () => tripRequestIdOrName != null && tripRequestIdOrName != '';

  const handleSave = (e: SyntheticEvent) => {
    e.preventDefault();
    seekingADriver();
  }

  const seekingADriver = () => {
    socket.timeout(5000).emit("NO_APP_USER_FIND_DRIVER", {
      fullName: "Kim Ngan",
      namw: "Nguyen Thi"
    }, () => {
      console.log("val");
    })
  }

  if (fetching) {
    return (
      <Loading error={error} width="900px" height="500px" />
    )
  }

  return (
    <div className="p-4 sm:p-10 overflow-y-auto w-[1200px] h-[700px] no-scrollbar">
      <div className="mb-6">
        <h1 className="mb-2 text-xl font-bold text-gray-800 pb-6">
          Trip #434473274329075
          <div className="pt-2">
            <Badge>Accepted</Badge>
          </div>
        </h1>
      </div>
      <form onSubmit={handleSave} method="POST">
        <div className="flex flex-col">
          <Label htmlFor="border">General Information</Label>
          <div>

            <div className="mb-6">
              <Label htmlFor="fullName" required>Full Name</Label>
              <Input id="fullName"/>
            </div>

            <div className="mb-6">
              <Label htmlFor="from">From</Label>
              <div id="from">Nghia Dia</div>
            </div>
          </div>

          <Label htmlFor="border">Requestor</Label>
          <div className="border">
            dasdajsdasjdaskd
          </div>

          <Label htmlFor="border">Driver</Label>
          <div className="border">
            dasdajsdasjdaskd
          </div>

          {/* <div className="flex-1 pr-4">
            <div className="mb-6">
              <Label htmlFor="fullName" required>Full Name</Label>
              <Input id="fullName" onChange={setFullName} required />
            </div>

            <div className="mb-6">
              <Label htmlFor="phoneNumber" required>Phone Number</Label>
              <Input type="tel" id="phoneNumber" onChange={setPhoneNumber} required />
            </div>

            <div className="mb-6">
              <Label htmlFor="identityCard">Identity Card</Label>
              <Input id="identityCard" onChange={setIdentityCard} required />
            </div>

            <div className="mb-6">
              <Label htmlFor="pickupLocation" required>Where we can pickup you?</Label>
              <Input id="pickupLocation" onChange={setPickupLocation} required />
            </div>
          </div> */}

          <div className="flex-1 pl-4">

            <div className="mb-6">
              <Label htmlFor="paymentMethod">What type of payment method?</Label>
              <Input disabled="disabled" id="paymentMethod" value="Cash" required />
            </div>
            <div className="mb-6">
              <Label htmlFor="paymentMethod">What type of payment method?</Label>
              <Input disabled="disabled" id="paymentMethod" value="Cash" required />
            </div>
            <div className="mb-6">
              <Label htmlFor="paymentMethod">What type of payment method?</Label>
              <Input disabled="disabled" id="paymentMethod" value="Cash" required />
            </div>
            <div className="mb-6">
              <Label htmlFor="paymentMethod">What type of payment method?</Label>
              <Input disabled="disabled" id="paymentMethod" value="Cash" required />
            </div>

            <div className="mb-6">
              <Label htmlFor="paymentMethod">What type of payment method?</Label>
              <Input disabled="disabled" id="paymentMethod" value="Cash" required />
            </div>
            <div className="mb-6">
              <Label htmlFor="paymentMethod">What type of payment method?</Label>
              <Input disabled="disabled" id="paymentMethod" value="Cash" required />
            </div>


            <div className="mb-6">
              <Label htmlFor="dropOffLocation" required>Where you want to go?</Label>
              <Input id="dropOffLocation" onChange={setDropOffLocation} required />
            </div>

            <div className="mb-6">
              <Label htmlFor="vehicleType" required>How many seats you need?</Label>
              <select id="vehicleType" className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={vehicleType}
                style={{ height: '46px' }}
                required
                onChange={(e) => setvehicleType(e.target.value)}
              >
                <option value="">Choose number of seats</option>
                {CAR_SEATS?.map((rol: any) => {
                  return <option key={rol.value} value={rol.value}>{rol.label}</option>
                })}
              </select>
            </div>

            <div className="mb-6">
              <Label htmlFor="paymentMethod">What type of payment method?</Label>
              <Input disabled="disabled" id="paymentMethod" value="Cash" required />
            </div>

            <div className="mb-6">
              <Label htmlFor="timePickup">Time to pickup?</Label>
              <Input type="datetime-local" id="timePickup" onChange={setDropOffLocation} required />
            </div>
          </div>

          {/* Test */}
          <div className="flex-1">

            <div className="mb-6">
              <Label htmlFor="dropOffLocation" required>Where you want to go?</Label>
              <Input id="dropOffLocation" onChange={setDropOffLocation} required />
            </div>

            <div className="mb-6">
              <Label htmlFor="vehicleType" required>How many seats you need?</Label>
              <select id="vehicleType" className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={vehicleType}
                style={{ height: '46px' }}
                required
                onChange={(e) => setvehicleType(e.target.value)}
              >
                <option value="">Choose number of seats</option>
                {CAR_SEATS?.map((rol: any) => {
                  return <option key={rol.value} value={rol.value}>{rol.label}</option>
                })}
              </select>
            </div>
            <div className="mb-6">
              <Label htmlFor="dropOffLocation" required>Where you want to go?</Label>
              <Input id="dropOffLocation" onChange={setDropOffLocation} required />
            </div>

            <div className="mb-6">
              <Label htmlFor="vehicleType" required>How many seats you need?</Label>
              <select id="vehicleType" className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={vehicleType}
                style={{ height: '46px' }}
                required
                onChange={(e) => setvehicleType(e.target.value)}
              >
                <option value="">Choose number of seats</option>
                {CAR_SEATS?.map((rol: any) => {
                  return <option key={rol.value} value={rol.value}>{rol.label}</option>
                })}
              </select>
            </div>
          </div>
          {/* endTest */}

          <div className="col-span-6">
            <Label htmlFor="notes">Notes</Label>
            <textarea id="notes" rows={3} className="border block w-full rounded-lg p-2.5" placeholder="Write something for your driver ..." />
          </div>

          <div className="w-[300px] pt-8">
            <button type="submit">dsadasddas</button>
            <Button type="submit" onClick={() => setLoadingBtn(true)} disabled={loadingBtn}>
              {loadingBtn && (
                <div className="flex">
                  <svg className="inline w-4 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <div>Seeking your driver</div>
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
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}