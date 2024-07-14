import {
  Button,
  Datepicker,
  Label,
  Sidebar,
  Spinner,
  TextInput,
} from "flowbite-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { HiUpload } from "react-icons/hi";
import { uploadFileToS3 } from "../../aws/s3UploadImage";
import { formatDate } from "../../utils/formatDate";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import { api } from "../../api/api";

export default function DashSetting() {
  const [tab, setTab] = useState<string>("profile");

  return (
    <div className="w-full bg-neutral-100">
      <div className="p-10">
        <h1 className="text-3xl font-semibold">Profile Setting</h1>

        <div className="flex flex-col md:flex-row w-full rounded-xl shadow-md">
          {/* SUBTAB */}
          <div className="md:w-80 bg-white rounded-xl">
            <Sidebar className="w-full border-r border-neutral-200">
              <Sidebar.Items>
                <Sidebar.ItemGroup className="cursor-pointer">
                  <Sidebar.Item active={tab === "profile"}>
                    <p onClick={() => setTab("profile")}>Profile</p>
                  </Sidebar.Item>
                  <Sidebar.Item active={tab === "profile1"}>
                    <p onClick={() => setTab("profile1")}>Profile</p>
                  </Sidebar.Item>
                  <Sidebar.Item active={tab === "profile2"}>
                    <p onClick={() => setTab("profile2")}>Profile</p>
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>

          {/* CONTENT */}
          <div className="w-full bg-[#F9FAFB]">
            {tab === "profile" && <Profile />}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormData {
  firstName: string;
  lastName: string;
  mobile: string;
  address: string;
  dateOfBirth: string;
  avatar: string;
  email: string;
}

const Profile = () => {
  const dispatch = useDispatch();
  const { loadingUpdate } = useSelector((state: RootState) => state.user);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(currentUser.avatar);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({} as FormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [selectedDate, setSelectedDate] = useState<string | null>(
    formatDate(currentUser.dateOfBirth)
  );

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (date: string | null) => {
    setSelectedDate(date ? formatDate(date) : null);
    setFormData({ ...formData, dateOfBirth: selectedDate! });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    setLoading(true);

    const params = {
      region: import.meta.env.VITE_S3_REGION!,
      accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY!,
      secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY!,
      bucket: import.meta.env.VITE_S3_BUCKET!,
    };

    if (!image) {
      setLoading(false);
      return;
    }

    uploadFileToS3(
      image,
      params,
      (url: string) => {
        setImageUrl(url);
        setLoading(false);
        setFormData({ ...formData, avatar: url });
      },
      (error: any) => {
        console.error("Error uploading image", error);
        setLoading(false);
      }
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await api.updateUser(formData, currentUser._id);
      console.log(res);
      if (res.data) {
        dispatch(updateUserSuccess(res.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error));
    }
  };

  return (
    <div className="flex flex-col p-2">
      <form className="w-full flex p-2" onSubmit={handleSubmit}>
        <div className="w-2/3 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-neutral-500">First Name</Label>
              <TextInput
                id="firstName"
                placeholder={currentUser.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-neutral-500">Last Name</Label>
              <TextInput
                id="lastName"
                placeholder={currentUser.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-neutral-500">Email</Label>
              <TextInput
                id="email"
                placeholder={currentUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-neutral-500">Mobile</Label>
              <TextInput
                id="mobile"
                placeholder={currentUser.mobile}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Label className="text-sm text-neutral-500">Address</Label>
            <TextInput
              id="address"
              placeholder={currentUser.address}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-neutral-500">Birthday</Label>
              <Datepicker
                id="dateOfBirth"
                value={selectedDate}
                onSelectedDateChanged={handleDateChange}
              />
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="text-sm bg-[#3BB67F]"
              size="sm"
              color="green"
            >
              {loading ? (
                <div className="">
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
        {/* UPLOAD AVATAR */}
        <div className="w-1/3">
          <div className="flex justify-center items-center h-full flex-col gap-4">
            <div onClick={() => imageInputRef.current?.click()}>
              <img
                src={imageUrl}
                alt=""
                className="lg:w-40 lg:h-40 md:w-32 md:h-32 rounded-full"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputRef}
              className="hidden"
            />
            <Button
              className="text-sm border"
              size="sm"
              color="green"
              outline
              onClick={handleUpload}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <HiUpload className="inline-block" />
                  Upload
                </div>
              )}
            </Button>
          </div>
        </div>
      </form>

      <div className="p-6 border-t">
        <div className="grid grid-cols-2 gap-6">
          <div className="border p-4 pb-8 rounded-md bg-neutral-100 flex flex-col lg:flex-row lg:justify-between items-start lg:items-center">
            <div>
              <h1 className="text-base font-semibold">Password</h1>
              <p className="text-sm text-neutral-400">
                You can reset or change your password by clicking here
              </p>
            </div>
            <Button color="green" className="border h-11 mt-4 lg:mt-0">
              Change
            </Button>
          </div>
          <div className="border p-4 pb-8 rounded-md bg-neutral-100 flex flex-col lg:flex-row lg:justify-between items-start lg:items-center ">
            <div>
              <h1 className="text-base font-semibold">Remove account</h1>
              <p className="text-sm text-neutral-400">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
            <Button color="green" className="border  h-11 mt-4 lg:mt-0">
              Deactivate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
