import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StaticDataContext } from "../../../context/StaticContext";
import {
  useEditFoodMutation,
  useGetFoodQuery,
} from "../../../app/services/foodApi";
import { FormInputType } from "../../../dataTypes/Input.type";
import {
  requiredNumberValidator,
  requiredStringValidator,
} from "../../../validator/rules";
import { ButtonType } from "../../../dataTypes/Button.type";
import { FormValuesType } from "../../../dataTypes/Form.type";
import { FoodDataType } from "../../../dataTypes/Data.type";
import Form from "../../../components/global/form/Form";
import swal from "sweetalert";
import "./menu.scss";
import Loader from "../../../components/global/loader/Loader";

export default function EditFood() {
  const params = useParams();
  const navigate = useNavigate();
  const { staticData } = useContext(StaticDataContext);
  const { data: foodInfo } = useGetFoodQuery(params.ID || "");
  const [editFood] = useEditFoodMutation();
  if (!foodInfo || !staticData) {
    return <Loader />;
  }

  const {
    title,
    menuCategoryID,
    price,
    description,
    ingredients,
    calories,
    image,
  } = foodInfo;

  const inputs: FormInputType[] = [
    {
      tag: "text",
      name: "title",
      label: {
        content: "عنوان : ",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: title,
    },
    {
      tag: "select",
      name: "menuCategoryID",
      label: {
        content: "دسته بندی  : ",
        color: "#222",
      },
      selectValues: staticData.menuCategory?.map((item) => ({
        id: item.id,
        value: item.id,
        title: item.title,
      })),
      validators: [requiredStringValidator()],
      initialvalue: menuCategoryID,
    },
    {
      tag: "number",
      name: "calories",
      label: {
        content: "میزان کالری : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: calories,
    },
    {
      tag: "bigNumber",
      name: "price",
      label: {
        content: "قیمت (تومان) : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: price,
    },
    {
      tag: "text",
      name: "image",
      label: {
        content: "تصویر : ",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: image,
    },
    {
      tag: "textarea",
      name: "ingredients",
      label: {
        content: "محتویات : ",
        color: "#222",
      },
      validators: [],
      initialvalue: ingredients,
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
    const { price } = items;

    const newFood: FoodDataType = {
      ...foodInfo,
      ...items,
      price: Number(String(price).replace(/,/g, "")),
    };

    await editFood(newFood);
    swal({
      text: "ویرایش اطلاعات با موفقیت انجام شد",
    });
    navigate("/amandaHotel/adminPanel/menu");
  };

  return (
    <div className="addFood-wrapper container">
      <Form
        inputs={inputs}
        buttons={buttons}
        submitHandler={submitHandler}
        formNotReset={true}
      />
    </div>
  );
}
