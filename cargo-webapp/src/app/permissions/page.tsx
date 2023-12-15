'use client'

import { useEffect, useState } from "react";
import ContentBox, { Header, } from "../components/ContentBox";
import Input from "../components/Input";
import Table, { TABLE_ROW_ACTIONS } from "../components/Table";
import Button from "../components/Button";
import useAxiosAuth from "../lib/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import CreateOrUpdateForm, { Action } from "./CreateOrUpdateForm";
import Badge from "../components/Badge";

type Permission = {
  id: string | number,
  name: string,
  status: string,
  description?: string,
  createdAt: string
}

const PERMISSION_HEADERS = [
  {
    name: "ID",
    columnIndex: 'id'
  },
  {
    name: "Name",
    columnIndex: 'name'
  },
  {
    name: "Description",
    columnIndex: 'description'
  },
  {
    name: "Create At",
    columnIndex: 'createdAt'
  },
  {
    name: "Status",
    columnIndex: 'status',
    render: (val: any) => {
      return val == "IN_USE" ? <Badge color="blue">In Use</Badge> : <Badge color="red">Disabled</Badge>
    }
  },
  {
    name: "Action",
    columnIndex: TABLE_ROW_ACTIONS
  }
]

export default function Permissions() {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState<Action>();
  const [permissions, setPermissions] = useState<Array<Permission>>();
  const [refresh, setRefresh] = useState<Date | null>();
  const [selectedName, setSelectedName] = useState('');
  const [loading, setLoading] = useState(true);
  const api = useAxiosAuth();

  useEffect(() => {
    fetchPermissions();
  }, [refresh]);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const { data: permissions } = await api.get("/permissions");
      setPermissions(permissions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ContentBox loading={loading}>
      <Header name="Permissions" />
      <div className="flex w-[500px]">
        <div className="w-[300px]">
          <Input placeholder="Search ..." />
        </div>
        <div className="pl-6">
          <Button onClick={() => {
            setAction(Action.CREATE);
            setShowModal(true);
          }}>New Permission</Button>
        </div>
      </div>


      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
        >
          <CreateOrUpdateForm
            permissionName={selectedName}
            action={action}
            onSaved={(data) => {
              setShowModal(false);
              setRefresh(new Date());
              toast.success(`Successfully ${action == Action.CREATE ? 'created' : 'updated'} ${data.name} permission.`);
            }} />
        </Modal>
      )}

      <div className="py-6">
        <Table
          headers={PERMISSION_HEADERS}
          rowData={permissions}
          allowActions
          onRowClick={({ name }) => {
            setAction(Action.UPDATE);
            setSelectedName(name);
            setShowModal(true);
          }}
        />
      </div>
    </ContentBox>
  )
}
