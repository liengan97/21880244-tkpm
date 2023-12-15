'use client'

import { useEffect, useState } from "react";
import ContentBox, { Header, } from "../components/ContentBox";
import Input from "../components/Input";
import Table, { TABLE_ROW_ACTIONS } from "../components/Table";
import Button from "../components/Button";
import useAxiosAuth from "../lib/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import CreateOrUpdateForm from "./CreateOrUpdateForm";
import Modal from "../components/Modal";
import Badge from "../components/Badge";

type Role = {
  id: string | number,
  name: string,
  description?: string,
  createdAt: string
}

const ROLE_HEADERS = [
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
    name: "Permissions",
    columnIndex: 'permissionSet',
    render: (val: any) => {
      return val ? <Badge color="blue">SET</Badge> : <Badge color="red">UNSET</Badge>
    }
  },
  {
    name: "Create At",
    columnIndex: 'createdAt'
  },
  {
    name: "Actions",
    columnIndex: TABLE_ROW_ACTIONS
  }
]

export default function Roles() {
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState<Array<Role>>([]);
  const [refresh, setRefresh] = useState<Date>();
  const [updateRole, setUpdateRole] = useState<string | null>();
  const api = useAxiosAuth();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRoles = () => {
    setLoading(true);
    api.get("/roles")
      .then(({ data }) => {
        setRoles(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchRoles();
  }, [refresh]);

  return (
    <ContentBox loading={loading}>
      <Header name="Roles" />
      <div className="flex w-[500px]">
        <div className="w-[300px]">
          <Input placeholder="Search ..." />
        </div>
        <div className="pl-6">
          <Button onClick={() => {
            setShowModal(true);
            setUpdateRole(null);
          }}>New Role</Button>
        </div>
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
        >
          <CreateOrUpdateForm
            roleName={updateRole}
            onSaved={(data) => {
              setShowModal(false);
              setRefresh(new Date());
              setUpdateRole(null);
              toast.success(`Successfully created ${data.name} role.`);
            }} />
        </Modal>
      )}

      <div className="py-6">
        <Table
          headers={ROLE_HEADERS}
          rowData={roles}
          allowActions
          onRowClick={({ name }) => {
            setUpdateRole(name);
            setShowModal(true);
          }}
        />
      </div>
    </ContentBox>
  )
}