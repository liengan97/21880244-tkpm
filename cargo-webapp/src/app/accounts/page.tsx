'use client'

import { useEffect, useRef, useState } from "react";
import ContentBox, { Header, } from "../components/ContentBox";
import Input from "../components/Input";
import Table, { TABLE_ROW_ACTIONS } from "../components/Table";
import Button from "../components/Button";
import useAxiosAuth from "../lib/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import CreateOrUpdateForm from "./CreateOrUpdateForm";
import Modal from "../components/Modal";
import Badge from "../components/Badge";

type Account = {
  id: string | number,
  name: string,
  description?: string,
  createdAt: string,
}

const ACCOUNT_HEADERS = [
  {
    name: "ID",
    columnIndex: 'id'
  },
  {
    name: "Email",
    columnIndex: 'email'
  },
  {
    name: "Display Name",
    columnIndex: 'name'
  },
  {
    name: "Create At",
    columnIndex: 'createdAt'
  },
  {
    name: "Role",
    columnIndex: 'roleName'
  },
  {
    name: "Status",
    columnIndex: 'status',
    render: (val: any) => {
      if (val == "ACTIVE") {
        return <Badge color="blue">{val}</Badge>
      }

      if (val == "DISABLED") {
        return <Badge color="red">{val}</Badge>
      }

      return <Badge>{val}</Badge>;
    }
  },
  {
    name: "Actions",
    columnIndex: TABLE_ROW_ACTIONS
  }
]

export default function Accounts() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState<Array<any>>([]);
  const [refresh, setRefresh] = useState<Date>();
  const [updateAccount, setUpdateAccount] = useState<string | null>();
  const api = useAxiosAuth();

  const fetchAccounts = async () => {
    setLoading(true);

    try {
      const { data: roles } = await api.get("/roles");
      const { data: accounts } = await api.get("/staffs");
      setAccounts(mapRoleIdToName(roles, accounts));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const mapRoleIdToName = (roles: any, accounts: any) => {
    return accounts?.map((account: any) => {
      const role = roles.find((role: any) => role.id == account.roleId);
      return {
        ...account,
        roleName: role?.name
      }
    })
  }

  useEffect(() => {
    fetchAccounts();
  }, [refresh]);

  return (
    <ContentBox loading={loading}>
      <Header name="Accounts" />
      <div className="flex w-[500px]">
        <div className="w-[300px]">
          <Input placeholder="Search ..." />
        </div>
        <div className="pl-6">
          <Button onClick={() => {
            setShowModal(true);
            setUpdateAccount(null);
          }}>New Account</Button>
        </div>
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
        >
          <CreateOrUpdateForm
            roleName={updateAccount}
            onSaved={(data) => {
              setShowModal(false);
              setRefresh(new Date());
              setUpdateAccount(null);
              toast.success(`Successfully created ${data.name} account.`);
            }} />
        </Modal>
      )}

      <div className="py-6">
        <Table
          headers={ACCOUNT_HEADERS}
          rowData={accounts}
          allowActions
          onRowClick={({ email }) => {
            setUpdateAccount(email);
            setShowModal(true);
          }}
        />
      </div>
    </ContentBox>
  )
}