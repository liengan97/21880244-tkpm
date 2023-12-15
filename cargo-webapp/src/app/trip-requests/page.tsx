'use client'

import { useEffect, useMemo, useState } from "react";
import ContentBox, { Header } from "../components/ContentBox";
import Input from "../components/Input";
import V2Table, { TableHeaderProps } from "../components/V2Table";
import Button from "../components/Button";
import useAxiosAuth from "../lib/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import CreateForm from "./CreateForm";
import Modal from "../components/Modal";
import TripDetails from "./TripDetails";
import { useSession } from "next-auth/react";

type TripRequest = {
  id: string | number,
  title: string,
  description?: string,
  createdAt: string
}

enum ModalType {
  CREATE,
  DETAIL
}

export default function TripRequests() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.CREATE);
  const [tripRequests, setTripRequests] = useState<TripRequest[]>([]);
  const [refresh, setRefresh] = useState<Date>();
  const {data} = useSession();

  const TRIP_REQUEST_HEADERS: TableHeaderProps[] = useMemo(() => ([
    {
      title: "ID",
      columnKey: 'id'
    },
    {
      title: "Name",
      width: '300px',
      columnKey: 'userName'
    },
    {
      title: "Driver Name",
      width: '250px',
      columnKey: 'driverName',
    },
    {
      title: "Driver Mobile",
      width: '200px',
      columnKey: 'driverMobile',
    },
    {
      title: "Car Number",
      width: '150px',
      columnKey: 'carNumber'
    },
    {
      title: "Seats Number",
      columnKey: 'seatNumber'
    },
    {
      title: "Pickup At",
      width: '250px',
      columnKey: 'pickAddress'
    },
    {
      title: "DropOff At",
      width: '250px',
      columnKey: 'desAddress'
    },
    {
      title: "Created by",
      width: '150px',
      columnKey: 'creator'
    },
    {
      title: "Status",
      columnKey: 'permissionSet',
    },
    {
      title: "Payment Method",
      columnKey: 'paymentMethod'
    },
    {
      title: "Price",
      columnKey: 'price'
    },
    {
      title: "Notes",
      columnKey: 'notes'
    },
    {
      title: "Create At",
      width: '150px',
      columnKey: 'createdAt',
    },
    {
      title: "Update At",
      width: '150px',
      columnKey: 'updatedAt',
    },
  ]), []);

  const api = useAxiosAuth();

  const fetchTripRequests = () => {
    setLoading(true);

    api.get(`/staffs/trips/${data?.user.email}`)
      .then(({ data }) => {
        setTripRequests(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchTripRequests();
  }, [refresh]);

  return (
    <ContentBox loading={loading}>
      <Header name="Manual Trip Requests" />
      <div className="flex w-[500px]">
        <div className="w-[300px]">
          <Input placeholder="Search ..." />
        </div>
        <div className="pl-6">
          <Button onClick={() => {
            setModalType(ModalType.CREATE);
            setShowModal(true);
          }}>New Trip</Button>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} >
          <div>
            {modalType == ModalType.CREATE && (
              <CreateForm
                onSaved={(data) => {
                  setShowModal(false);
                  setRefresh(new Date());
                  toast.success(`Successfully created ${data.name} role.`);
                }} />
            )}

            {modalType == ModalType.DETAIL && (
              <TripDetails
                onSaved={(data) => {
                  setShowModal(false);
                  setRefresh(new Date());
                  toast.success(`Successfully created ${data.name} role.`);
                }} />
            )}
          </div>
        </Modal>
      )}

      <div className="py-6">
        <V2Table headers={TRIP_REQUEST_HEADERS} dataRows={tripRequests} />
      </div>
    </ContentBox>
  )
}