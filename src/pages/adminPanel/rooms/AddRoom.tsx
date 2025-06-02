import { useContext } from "react";
import { NewRoomDataType } from "../../../dataTypes/Data.type";
import { FormInputType } from "../../../dataTypes/Input.type";
import {
  requiredNumberValidator,
  requiredStringValidator,
} from "../../../validator/rules";
import { ButtonType } from "../../../dataTypes/Button.type";
import { FormValuesType } from "../../../dataTypes/Form.type";
import Form from "../../../components/global/form/Form";
import { StaticDataContext } from "../../../context/StaticContext";
import {
  useAddRoomMutation,
  useGetRoomsQuery,
} from "../../../app/services/roomApi";
import "./rooms.scss";
import swal from "sweetalert";
import Loader from "../../../components/global/loader/Loader";

export default function AddRoom() {
  const { staticData } = useContext(StaticDataContext);
  const { data: rooms } = useGetRoomsQuery();
  const [addRoom] = useAddRoomMutation();
  if (!staticData || !rooms) {
    return <Loader />;
  }

  const inputs: FormInputType[] = [
    {
      tag: "number",
      name: "roomNumber",
      label: {
        content: "شماره اتاق : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: rooms
        ?.map((item) => item.roomNumber)
        .reduce((max, current) => (current > max ? current : max)),
    },
    {
      tag: "number",
      name: "floor",
      label: {
        content: "طبقه : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: "",
    },

    {
      tag: "select",
      name: "roomTypeID",
      label: {
        content: "نوع اتاق : ",
        color: "#222",
      },
      selectValues: staticData.roomCategory?.map((item) => ({
        id: item.id,
        value: item.id,
        title: item.title,
      })),
      validators: [requiredStringValidator()],
      initialvalue: staticData.roomCategory[0].id,
    },
    {
      tag: "number",
      name: "capacity",
      label: {
        content: "ظرفیت پایه (نفر) : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: "",
    },
    {
      tag: "number",
      name: "maxAddedPeople",
      label: {
        content: "تعداد نفرات مازاد : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: "",
    },
    {
      tag: "bigNumber",
      name: "price",
      label: {
        content: "قیمت پایه (تومان) : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: "",
    },
    {
      tag: "bigNumber",
      name: "pricePerAddedPerson",
      label: {
        content: "قیمت هر نفر مازاد (تومان) : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: "",
    },

    {
      tag: "text",
      name: "images",
      label: {
        content: "تصاویر : ",
        color: "#222",
      },
      validators: [],
      initialvalue: "",
    },
    {
      tag: "textarea",
      name: "description",
      label: {
        content: "توضیحات : ",
        color: "#222",
      },
      validators: [],
      initialvalue: "",
    },
  ];
  const buttons: ButtonType[] = [
    {
      innerHtml: "ثبت",
      type: "submit",
      bgColor: "var(--gold-color)",
    },
  ];
  const submitHandler = async (items: FormValuesType) => {
    const {
      roomNumber,
      floor,
      capacity,
      price,
      maxAddedPeople,
      pricePerAddedPerson,
      roomTypeID,
      description,
      images,
    } = items;

    const newRoom: NewRoomDataType = {
      roomNumber: Number(roomNumber),
      floor: Number(floor),
      capacity: Number(capacity),
      price: Number(String(price).replace(/,/g, "")),
      maxAddedPeople: Number(maxAddedPeople),
      pricePerAddedPerson: Number(
        String(pricePerAddedPerson).replace(/,/g, "")
      ),

      score: 0,
      roomTypeID: String(roomTypeID),
      description: String(description),
      images: [String(images)],

      scores: [],
      likedUserIDs: [],
      comments: [],
    };

    await addRoom(newRoom);
    swal({
      text: "مشکلی در سمت سرور پیش آمده، لطفاً مجدادا تلاش کنید",
    });
  };
	
  return (
    <div className="addRoom-wrapper container">
      <Form
        inputs={inputs}
        buttons={buttons}
        submitHandler={submitHandler}
        formNotReset={true}
      />
    </div>
  );
}
