import React, { useEffect, useState } from "react";
import TextInput from "../../Components/Forms/TextInput/TextInput";
import ValueIncrement from "../../Components/Forms/ValueIncrement/ValueIncrement";
import debounce from "../../Api/Utils/Debounce";
import { User } from "../../Api/User/User";
import Modal from "../../Components/Modal/Modal";
import Button from "../../Components/Forms/Button/Button";
import Select from "../../Components/Forms/Select/Select";
export default function AdminUsers() {
  const [search, setSearch] = useState({
    name: "",
    email: "",
    role: "",
    created: "",
    page: 1,
    show: 10,
  });

  const [data, setData] = useState<any>({
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [createUser, setCreateUser] = useState<any>({
    show: false,
  });

  function onSearch(newSearch: any) {
    setSearch(newSearch);
    setLoading(true);
    setData({
      data: [],
    });
    User.searchUsers(newSearch).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }
  function openCreateUser() {
    setCreateUser({ show: true });
  }

  function createNewUser() {
    User.createUser(createUser).then((res) => {
      setCreateUser({ show: false });
      onSearch(search);
    });
  }
  function updateUser() {
    User.updateUser(selectedRow).then((res) => {
      setSelectedRow(null);

      onSearch(search);
    });
  }
  function deleteUser() {
    User.deleteUser(selectedRow).then((res) => {
      setSelectedRow(null);

      onSearch(search);
    });
  }

  useEffect(() => {
    User.searchUsers(search).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {selectedRow != null && (
        <Modal
          isOpen={true}
          title={"Edit user"}
          onClose={() => {
            setSelectedRow(null);
          }}
        >
          <div className="w-72">
            <TextInput
              placeholder="Name"
              value={selectedRow.name}
              onChange={(e) => {
                setSelectedRow({ ...selectedRow, name: e.target.value });
              }}
            ></TextInput>
            <TextInput
              placeholder="Email"
              value={selectedRow.email}
              onChange={(e) => {
                setSelectedRow({ ...selectedRow, email: e.target.value });
              }}
            ></TextInput>
            <Select
              options={["User", "WarehouseWorker", "Admin"]}
              selected={selectedRow.role}
              onChange={(e) => {
                setSelectedRow({ ...selectedRow, role: e.target.value });
              }}
            ></Select>
            <TextInput
              placeholder="Password"
              value={selectedRow.password}
              onChange={(e) => {
                setSelectedRow({ ...selectedRow, password: e.target.value });
              }}
            ></TextInput>
            <div className="flex justify-between">
              <Button onClick={updateUser}>Edit</Button>
              <Button variant="secondary" onClick={deleteUser}>
                <i className="fas fa-trash"></i> Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {createUser.show && (
        <Modal
          isOpen={true}
          title={"Create user"}
          onClose={() => {
            setCreateUser({ show: false });
          }}
        >
          <div className="w-72">
            <TextInput
              placeholder="Name"
              value={createUser.name}
              onChange={(e) => {
                setCreateUser({ ...createUser, name: e.target.value });
              }}
            ></TextInput>
            <TextInput
              placeholder="Email"
              value={createUser.email}
              onChange={(e) => {
                setCreateUser({ ...createUser, email: e.target.value });
              }}
            ></TextInput>
            <Select
              options={["User", "WarehouseWorker", "Admin"]}
              selected={createUser.role}
              onChange={(e) => {
                setCreateUser({ ...createUser, role: e.target.value });
              }}
            ></Select>
            <TextInput
              placeholder="Password"
              value={createUser.password}
              onChange={(e) => {
                setCreateUser({ ...createUser, password: e.target.value });
              }}
            ></TextInput>

            <Button onClick={createNewUser}>Create</Button>
          </div>
        </Modal>
      )}

      <Button onClick={openCreateUser}>Add user</Button>
      <table>
        <thead>
          <tr>
            <th>
              <TextInput
                placeholder="Name"
                onChange={(e) => onSearch({ ...search, name: e.target.value })}
              ></TextInput>
            </th>
            <th>
              <TextInput
                placeholder="Email"
                onChange={(e) => onSearch({ ...search, email: e.target.value })}
              ></TextInput>
            </th>
            <th>
              <TextInput
                placeholder="Role"
                onChange={(e) => onSearch({ ...search, role: e.target.value })}
              ></TextInput>
            </th>
            <th>
              <TextInput
                placeholder="Created"
                onChange={(e) =>
                  onSearch({ ...search, created: e.target.value })
                }
              ></TextInput>
            </th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            Array(10)
              .fill(0)
              .map((_, i) => (
                <tr className="odd:bg-blue-100 animate-pulse">
                  <td className="px-2 text-transparent select-none">loading</td>
                  <td className="px-2 text-transparent select-none">loading</td>
                  <td className="px-2 text-transparent select-none">loading</td>
                  <td className="px-2 text-transparent select-none">loading</td>
                </tr>
              ))}

          {data.data.length !== 0 &&
            data.data.map((user: any) => (
              <tr
                className=" odd:bg-blue-100 cursor-pointer"
                onContextMenu={(e: any) => {
                  e.preventDefault();
                  setSelectedRow(user);
                }}
              >
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.created}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="my-2">
        Page {search.page} of {data.last_page} Go to page:
        <ValueIncrement
          value={search.page}
          onChange={(value: number) => {
            if (value < 1) {
              value = 1;
            }
            if (value > data.last_page) {
              value = data.last_page;
            }
            onSearch({ ...search, page: value });
          }}
        ></ValueIncrement>
      </div>
      <div className="my-3">
        Show:{" "}
        <ValueIncrement
          value={search.show}
          onChange={(value: number) => {
            if (value < 1) {
              value = 1;
            }
            onSearch({ ...search, show: value });
          }}
        ></ValueIncrement>
      </div>
    </div>
  );
}
