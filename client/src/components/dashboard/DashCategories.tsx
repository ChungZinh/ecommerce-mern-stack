import {
  Button,
  Checkbox,
  Label,
  Select,
  Spinner,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import { api } from "../../api/api";
import { buildQueryString } from "../../utils/buildQueryString";

interface FormData {
  name: string;
  slug: string;
  parent: string;
  description: string;
}
interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
  description: string;
}

export default function DashCategories() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [formData, setFormData] = useState({} as FormData);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const sQuery = buildQueryString(query);
        const res = await api.getListCategory(currentUser._id, sQuery);
        if (res.data) {
          setCategories(res.data.categories);
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, [currentUser._id, query, editMode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.createCategory(formData, currentUser._id);
      if (res.data) {
        setCategories((prevCategories) => [...prevCategories, res.data]);
        //set form data is empty
        setLoading(false);
        if (loading === false) {
          setFormData({
            name: "",
            slug: "",
            parent: "",
            description: "",
          });
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating category", error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
      setQuery(`?page=${pageNumber}`);
    }
  };

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setQuery((prevQuery) => ({
      ...prevQuery,
      searchTerm: e.target.value,
    }));
  };

  const handleEdit = (c: Category) => {
    setFormData(c);
    setCategoryId(c._id);
    setEditMode(true);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.updateCategory(
        currentUser._id,
        categoryId,
        formData
      );
      if (res.data) {
        setEditMode(false);
        setFormData({
          name: "",
          slug: "",
          parent: "",
          description: "",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("Error updating category", error);
    }
  };
  return (
    <div className="p-10 w-full ">
      <div className="">
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="text-3xl font-semibold">Categories</h1>
            <p className="text-neutral-500 mt-2">
              Add, edit or delete a caterory
            </p>
          </div>

          <TextInput
            placeholder="Serach category"
            onChange={handleSearchTerm}
            className="mt-8"
          />
        </div>

        <div className="w-full mt-8 lg:flex lg:gap-8">
          <div className="lg:w-1/4 ">
            <div className=" bg-white mb-6  p-6 rounded-md shadow-md">
              <form
                onSubmit={editMode ? handleUpdate : handleSubmit}
                className="space-y-4"
              >
                {editMode && (
                  <div className="space-y-2">
                    <Label>Category Id</Label>
                    <TextInput
                      id="name"
                      value={formData._id}
                      disabled
                      placeholder="Type here"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Category name</Label>
                  <TextInput
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Type here"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category Slug</Label>
                  <TextInput
                    id="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="Type here"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category parent</Label>
                  <Select
                    id="parentCategory"
                    value={formData.parent}
                    onChange={handleChange}
                  >
                    <option value={""}>None</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category Description</Label>
                  <Textarea
                    rows={"5"}
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Type here"
                  />
                </div>

                <Button type="submit" className=" w-full bg-[#3BB67F]">
                  {loading ? (
                    <div className="">
                      <Spinner size={"sm"} />
                      <span className="pl-3">Loading...</span>
                    </div>
                  ) : (
                    <>{editMode ? "Update Category" : "Create Category"}</>
                  )}
                </Button>
              </form>
            </div>
          </div>
          <div className="lg:w-3/4">
            <div className=" bg-white  p-6 rounded-md shadow-md">
              <div
                className="table-auto w-full  overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
             dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700 "
              >
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>
                      <Checkbox color={"green"} />
                    </Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Slug</Table.HeadCell>
                    <Table.HeadCell>Parent</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {categories.map((category) => (
                      <Table.Row key={categories._id}>
                        <Table.Cell>
                          <Checkbox color={"green"} />
                        </Table.Cell>
                        <Table.Cell>{category.name}</Table.Cell>
                        <Table.Cell>{category.slug}</Table.Cell>
                        <Table.Cell>{category.parentCategory}</Table.Cell>
                        <Table.Cell>{category.description}</Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-1">
                            <Button
                              size={"sm"}
                              className="bg-[#3BB67F]"
                              onClick={() => handleEdit(category)}
                            >
                              Edit
                            </Button>
                            <Button size={"sm"} color={"green"}>
                              Delete
                            </Button>
                          </div>
                          {/* <Button color={'red'}>Delete</Button> */}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Button
                  size={"xs"}
                  color={"green"}
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index + 1}
                    size={"xs"}
                    color={"green"}
                    onClick={() => handlePageChange(index + 1)}
                    className={
                      page === index + 1 ? "bg-green-600 text-white" : ""
                    }
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  size={"xs"}
                  color={"green"}
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
