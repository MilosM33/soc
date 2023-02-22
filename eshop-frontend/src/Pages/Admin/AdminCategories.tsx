import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Category } from "../../Api/Category/Category";
import Button from "../../Components/Forms/Button/Button";
import SearchInput from "../../Components/Forms/SearchInput/SearchInput";
import Select from "../../Components/Forms/Select/Select";
import TextInput from "../../Components/Forms/TextInput/TextInput";
import ValueIncrement from "../../Components/Forms/ValueIncrement/ValueIncrement";
import Modal from "../../Components/Modal/Modal";

export default function AdminCategories() {
  const [search, setSearch] = useState({
    name: "",
    email: "",
    role: "",
    created: "",
    page: 1,
    show: 10,
  });

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [categoryForm, setCategoryForm] = useState<any>({
    show: false,
    name: "",
    slug: "",
    description: "",
    parent_name: "",
  });

  function createCategory() {
    Category.createCategory(categoryForm).then((res) => {
      setCategoryForm({ show: false });
      onSearch(search);
    });
  }
  function updateCategory() {
    Category.updateCategory(selectedRow).then((res) => {
      setSelectedRow(null);
      onSearch(search);
    });
  }

  function deleteCategory() {
    Category.deleteCategory(selectedRow).then((res) => {
      setSelectedRow(null);
      onSearch(search);
    });
  }

  function onSearch(newSearch: any) {
    setSearch(newSearch);
    setLoading(true);
    setData([]);
    Category.searchCategories(newSearch).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    Category.searchCategories({}).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <section>
      <Button
        variant="primary"
        onClick={() => {
          setCategoryForm({ show: true });
        }}
      >
        Add Category
      </Button>

      {categoryForm.show && (
        <Modal
          isOpen={true}
          title={"Edit categories"}
          onClose={() => {
            setCategoryForm({ show: false });
          }}
        >
          <div className="w-72">
            <TextInput
              placeholder="Category name"
              value={categoryForm.name}
              onChange={(e) => {
                setCategoryForm({ ...categoryForm, name: e.target.value });
              }}
            ></TextInput>
            <TextInput
              placeholder="Slug"
              value={categoryForm.slug}
              onChange={(e) => {
                setCategoryForm({ ...categoryForm, slug: e.target.value });
              }}
            ></TextInput>
            <TextInput
              placeholder="Description"
              value={categoryForm.description}
              onChange={(e) => {
                setCategoryForm({
                  ...categoryForm,
                  description: e.target.value,
                });
              }}
            ></TextInput>
            <SearchInput
              getData={(query: string) =>
                Category.searchCategories({
                  name: query,
                }).then((res: AxiosResponse<any>) => res)
              }
              value={categoryForm.parent_name}
              titleProperty="name"
              onChange={(value) => {
                setCategoryForm({ ...categoryForm, parent_name: value.name });
              }}
              placeholder="Parent Category"
            ></SearchInput>

            <Button variant="primary" onClick={createCategory} className="mr-4">
              Create
            </Button>
            
          </div>
        </Modal>
      )}

      {selectedRow && (
        <Modal
          isOpen={true}
          title={"Edit categories"}
          onClose={() => {
            setSelectedRow(null);
          }}
        >
          <div className="w-72">
            <TextInput
              placeholder="Category name"
              value={selectedRow.name}
              onChange={(e) => {
                setSelectedRow({ ...selectedRow, name: e.target.value });
              }}
            ></TextInput>
            <TextInput
              placeholder="Slug"
              value={selectedRow.slug}
              onChange={(e) => {
                setSelectedRow({ ...selectedRow, slug: e.target.value });
              }}
            ></TextInput>
            <TextInput
              placeholder="Description"
              value={selectedRow.description}
              onChange={(e) => {
                setSelectedRow({ ...selectedRow, description: e.target.value });
              }}
            ></TextInput>
            <SearchInput
              getData={(query: string) =>
                Category.searchCategories({
                  name: query,
                }).then((res: AxiosResponse<any>) => res)
              }
              value={selectedRow.parent_name}
              titleProperty="name"
              onChange={(value) => {
                setSelectedRow({ ...selectedRow, parent_name: value.name });
              }}
            ></SearchInput>

            <Button variant="primary" onClick={updateCategory} className="mr-4">
              Update
            </Button>
            <Button variant="secondary" onClick={deleteCategory}>
              Delete
            </Button>
          </div>
        </Modal>
      )}

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
                placeholder="Slug"
                onChange={(e) => onSearch({ ...search, slug: e.target.value })}
              ></TextInput>
            </th>
            <th>
              <TextInput
                placeholder="Description"
                onChange={(e) =>
                  onSearch({ ...search, description: e.target.value })
                }
              ></TextInput>
            </th>
            <th>
              <TextInput
                placeholder="Parent Category"
                onChange={(e) =>
                  onSearch({ ...search, parent: e.target.value })
                }
              ></TextInput>
            </th>
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
          {data &&
            data.map((category: any) => (
              <tr
                className=" odd:bg-blue-100 cursor-pointer"
                onContextMenu={(e: any) => {
                  e.preventDefault();
                  setSelectedRow(category);
                }}
              >
                <td className="p-2">{category.name}</td>
                <td className="p-2">{category.slug}</td>
                <td className="p-2">{category.description}</td>
                <td className="p-2">{category.parent_name}</td>
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
    </section>
  );
}
