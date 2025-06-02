import { useContext } from "react";
import { StaticDataContext } from "../../../context/StaticContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditRoomMutation,
  useGetRoomQuery,
} from "../../../app/services/roomApi";
import Form from "../../../components/global/form/Form";
import { FormInputType } from "../../../dataTypes/Input.type";
import {
  requiredNumberValidator,
  requiredStringValidator,
} from "../../../validator/rules";
import { ButtonType } from "../../../dataTypes/Button.type";
import { FormValuesType } from "../../../dataTypes/Form.type";
import { RoomDataType } from "../../../dataTypes/Data.type";
import swal from "sweetalert";
import Loader from "../../../components/global/loader/Loader";

export default function EditRoom() {
  const params = useParams();
  const navigate = useNavigate();
  const { staticData } = useContext(StaticDataContext);
  const { data: roomInfo } = useGetRoomQuery(params.ID || "");
  const [editRoom] = useEditRoomMutation();
  if (!roomInfo || !staticData) {
    return <Loader />;
  }

  const {
    roomNumber,
    floor,
    roomTypeID,
    capacity,
    price,
    pricePerAddedPerson,
    maxAddedPeople,
    description,
  } = roomInfo;

  const inputs: FormInputType[] = [
    {
      tag: "number",
      name: "roomNumber",
      label: {
        content: "شماره اتاق : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: roomNumber,
    },
    {
      tag: "number",
      name: "floor",
      label: {
        content: "طبقه : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: floor,
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
      initialvalue: roomTypeID,
    },
    {
      tag: "number",
      name: "capacity",
      label: {
        content: "ظرفیت پایه (نفر) : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: capacity,
    },
    {
      tag: "number",
      name: "maxAddedPeople",
      label: {
        content: "تعداد نفرات مازاد : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: maxAddedPeople,
    },
    {
      tag: "bigNumber",
      name: "price",
      label: {
        content: "قیمت پایه (تومان) : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: price,
    },
    {
      tag: "bigNumber",
      name: "pricePerAddedPerson",
      label: {
        content: "قیمت هر نفر مازاد (تومان) : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: pricePerAddedPerson,
    },

    {
      tag: "textarea",
      name: "description",
      label: {
        content: "توضیحات : ",
        color: "#222",
      },
      validators: [],
      initialvalue: description,
    },
  ];
  const buttons: ButtonType[] = [
    {
      innerHtml: "ویرایش",
      type: "submit",
      bgColor: "var(--gold-color)",
    },
  ];
  const submitHandler = async (items: FormValuesType) => {
    const {
      price,
      pricePerAddedPerson,
    } = items;

    const newRoom: RoomDataType = {
      ...roomInfo,
      ...items,
      price: Number(String(price).replace(/,/g, "")),
      pricePerAddedPerson: Number(
        String(pricePerAddedPerson).replace(/,/g, "")
      ),
    };

    await editRoom(newRoom);
    swal({
      text: "ویرایش اطلاعات با موفقیت انجام شد",
    });
    navigate("/amandaHotel/adminPanel/rooms");
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
