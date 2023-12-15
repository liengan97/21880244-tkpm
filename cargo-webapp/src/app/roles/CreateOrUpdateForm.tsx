import { SyntheticEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import useAxiosAuth from "../lib/hooks/useAxiosAuth";
import Loading from "../components/Loading";

export enum Action {
  CREATE,
  UPDATE
}

type Props = {
  onSaved: (values: any) => any,
  roleName?: string | null
  hideModal?: any
}

export default function CreateOrUpdateForm({ hideModal, roleName, onSaved }: Props) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [roleId, setRoleId] = useState<number>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [permissions, setPermissions] = useState<Array<any>>([]);
  const [assignedPermissions, setAssignedPermissions] = useState<Array<any>>([]);

  const api = useAxiosAuth();

  useEffect(() => {
    const load = async () => {
      if (isUpdateMode()) {
        fecthRoleAndPermissions(roleName);
      } else {
        fetchPermissions();
      }
    }
    load();
  }, []);

  const isUpdateMode = () => roleName != null && roleName != '';

  const fecthRoleAndPermissions = async (roleName: any) => {
    setFetching(true);

    try {
      const { data: role } = await api.get(`/roles/${roleName}`);
      const { data: allPermissions } = await api.get("/permissions");

      const assignedPermissionIds = role.permissions.map((p: any) => p.id);
      const unAssignedPermissions = allPermissions.filter((p: any) => !assignedPermissionIds.includes(p.id));

      setRoleId(role.id);
      setName(role.name);
      setDescription(role.description);

      setAssignedPermissions(role.permissions);
      setPermissions(unAssignedPermissions);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  }

  const fetchPermissions = async () => {
    setFetching(true);

    // await setTimeout(() => {
    //   setFetching(false);
    // }, 25000);

    try {
      const { data: allPermissions } = await api.get("/permissions");
      setPermissions(allPermissions);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  }

  const createRole = () => {
    api.post("/roles/create", {
      name,
      description,
      permissions: assignedPermissions.map(p => p.id)
    }).then(({ data }) => {
      onSaved(data);
      hideModal();
    }).catch(error => console.error(error));
  }

  const handleSave = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isUpdateMode()) {
      updateRole();
    } else {
      createRole();
    }
  }

  const addPermission = (id) => {
    const newPermission = permissions.find(p => p.id == id);
    const n = permissions.filter(p => p.id != id);

    setAssignedPermissions([
      ...assignedPermissions,
      newPermission
    ])

    setPermissions(n);
  }

  const removePermission = (id) => {
    const newPermission = assignedPermissions.find(p => p.id == id);
    const n = assignedPermissions.filter(p => p.id != id);

    setPermissions([
      ...permissions,
      newPermission
    ]);

    setAssignedPermissions(n);
  }

  const updateRole = () => {
    api.post("/roles/update", {
      id: roleId,
      name,
      description,
      permissions: assignedPermissions.map(p => p.id)
    })
      .then(({ data }) => {
        onSaved(data);
        hideModal();
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  if (fetching) {
    return (
      <Loading width="1200px" height="400px" />
    )
  }

  return (
    <div className="p-4 sm:p-10 overflow-y-auto w-full" style={{width: '1200px'}}>
      <div className="mb-6">
        <h1 className="mb-2 text-xl font-bold text-gray-800 pb-6">
          {isUpdateMode() ? 'Edit' : 'New'} role
        </h1>
      </div>

      <form onSubmit={handleSave} method="POST">
        {/* <div className="flex flex-row"> */}
        <div className="grid grid-cols-12 divide-x bg-white">
          {/* <div className="flex-1"> */}
          {/* <div className="flex bg-red basis-2 flex-col bg-white"> */}
          <div className="flex col-span-4 flex-col bg-white pr-4">
            <div className="mb-6">
              <label htmlFor="name" className="block text-base mb-2 ">Name</label>
              <div id="name">
                <Input
                  onChange={(val: any) => setName(val)}
                  required
                  value={name}
                  disabled={isUpdateMode() ? 'disabled' : ''}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="notes" className="block text-base mb-2 ">Description</label>
              <textarea
                id="notes"
                rows={3}
                className="border block w-full rounded-lg p-2.5"
                placeholder=""
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

          </div>
          {/* {isUpdateMode() && ( */}
            <>
              <div className="col-span-4 bg-green  border-l-1 p-4">
                <div>Available permissions</div>
                <ul>
                  {permissions?.map(p => {
                    return (
                      <li key={p.id} className="p-2 bg-slate-100 my-2 rounded">
                        <div className="flex justify-between">
                          <div>{p.name}</div>
                          <button type="button" onClick={addPermission.bind(null, p.id)}>
                            <svg className="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>

              </div>
              <div className="col-span-4 bg-green  border-l-1 p-4">
                <h3>Assigned permissions</h3>
                <ul>
                  {assignedPermissions?.map(p => {
                    return (
                      <li key={p.id} className="p-2 bg-slate-100 my-2 rounded">
                        <div className="flex justify-between">
                          <div>{p.name}</div>
                          <button type="button" onClick={removePermission.bind(null, p.id)}>
                            <svg className="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 1h16" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          {/* )} */}
        </div>

        <div className="col-span-1 pt-6">
          <button type="submit" disabled={loading} className=" py-3 px-4 inline-flex justify-center items-center gap-2 rounded font-semibold bg-blue-500 text-white transition-all text-sm">
            {loading && (
              <svg className="inline w-4 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            )}
            {!loading && (
              <span>Save</span>
            )}
          </button>
        </div>

        {/* </div> */}
      </form>

    </div>

  )
}