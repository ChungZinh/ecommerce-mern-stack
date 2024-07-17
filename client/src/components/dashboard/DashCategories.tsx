import {
  Button,
  Checkbox,
  Label,
  Select,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";

export default function DashCategories() {
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

          <TextInput placeholder="Serach category" className="mt-8" />
        </div>

        <div className="w-full mt-8 lg:flex lg:gap-8" >
          <div className="lg:w-1/4 bg-white mb-6  p-6 rounded-md shadow-md">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>Category name</Label>
                <TextInput id="name" placeholder="Type here" />
              </div>
              <div className="space-y-2">
                <Label>Category Slug</Label>
                <TextInput id="slug" placeholder="Type here" />
              </div>
              <div className="space-y-2">
                <Label>Category parent</Label>
                <Select id="parent">
                  <option>None</option>
                  <option>Category 1</option>
                  <option>Category 2</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category Description</Label>
                <Textarea rows={"5"} id="slug" placeholder="Type here" />
              </div>

              <Button className=" w-full bg-[#3BB67F]">Create Category</Button>
            </form>
          </div>
          <div className="lg:w-3/4 bg-white  p-6 rounded-md shadow-md">
            <Table>
              <Table.Head>
                <Table.HeadCell>
                  <Checkbox color={'green'}/>
                </Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Slug</Table.HeadCell>
                <Table.HeadCell>Parent</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Checkbox color={'green'}/>
                    </Table.Cell>
                    <Table.Cell>Category 1</Table.Cell>
                    <Table.Cell>category-1</Table.Cell>
                    <Table.Cell>None</Table.Cell>
                    <Table.Cell>Category 1 Description</Table.Cell>
                    <Table.Cell>
                      <Button color={'green'}>Edit</Button>
                      {/* <Button color={'red'}>Delete</Button> */}
                    </Table.Cell>
                  </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
