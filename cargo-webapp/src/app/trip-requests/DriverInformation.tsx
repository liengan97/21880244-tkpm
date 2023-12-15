export type TripInformation = {
  tripId: string,
  placedAt: string,
  pickupAt: string,
  dropOffAt: string,
  paymentMethod: string,
  totalAmount: Number
}

export type TripDetailInformationProps = {
  driverName: string,
  driverCarLicense: string,
  driverJoinAt: string,
  tripInformation: TripInformation
}

export default function TripDetailInformation(props: TripDetailInformationProps) {

  const { driverName, driverCarLicense, driverJoinAt, tripInformation } = props;
  const { tripId, placedAt, pickupAt, dropOffAt, paymentMethod, totalAmount } = tripInformation || {};

  return (
    <div className="flex flex-row p-8 divide-x w-[700px]">
      <div className="flex-1 pr-6 pt-6">
        <div className="text-xl font-bold">Your Driver</div>
        <div className="pt-6">
          <img className="w-20 h-20 rounded-full" src="https://images.pexels.com/photos/4022812/pexels-photo-4022812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div className="pt-6">
          <div className="flex items-center gap-4 pb-6">
            <div className="font-medium">
              <div className="text-lg pb-2">{driverName ?? 'Nguyen Van A'}</div>
              <div className="text-gray-500">{driverCarLicense ?? '49D1-826.82'}</div>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2023</div>
      </div>
      <div className="flex-1 pl-6 pt-6">
        <div className="text-xl font-bold">Trip Information</div>
        <div className="pt-6">
          <div className="pb-2">
            <div className="pb-4">
              <div className="py-1 font-medium">Trip ID:</div>
              <div className="font-bold">{tripId ?? '#547457745747747'}</div>
            </div>
            <div className="pb-4">
              <div className="font-medium">Placed At:</div>
              <div className="py-1">
                <span>2023/10/10</span> | <span>18:53</span>
              </div>
            </div>
            <div className="pb-4">
              <div className="font-medium">Pickup At:</div>
              <div className="py-1">123 Tan Phu, Ho Chi Minh City</div>
            </div>
            <div className="pb-4">
              <div className="font-medium">DropOff At:</div>
              <div className="py-1">456, Tan Phu, Ho Chi Minh City</div>
            </div>
            <div className="pb-4">
              <div className="font-medium">Payment Method:</div>
              <div className="py-1">Cash on Delivery</div>
            </div>
            <div className="pb-4">
              <div className="font-medium">Total Amount:</div>
              <div className="py-1">456, Tan Phu, Ho Chi Minh City</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}