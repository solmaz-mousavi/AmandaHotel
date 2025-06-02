import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StaticDataContext } from "../../../context/StaticContext";
import { useAddFoodMutation } from "../../../app/services/foodApi";
import { FormInputType } from "../../../dataTypes/Input.type";
import {
  requiredNumberValidator,
  requiredStringValidator,
} from "../../../validator/rules";
import { ButtonType } from "../../../dataTypes/Button.type";
import { FormValuesType } from "../../../dataTypes/Form.type";
import { NewFoodDataType } from "../../../dataTypes/Data.type";
import swal from "sweetalert";
import "./menu.scss";
import Form from "../../../components/global/form/Form";
import Loader from "../../../components/global/loader/Loader";

export default function AddFood() {
  const navigate = useNavigate();
  const { staticData } = useContext(StaticDataContext);
  const [addFood] = useAddFoodMutation();
  if (!staticData.menuCategory) {
    return <Loader />;
  }

  const inputs: FormInputType[] = [
    {
      tag: "text",
      name: "title",
      label: {
        content: "عنوان : ",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: "",
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
      initialvalue: staticData.menuCategory[0].id,
    },
    {
      tag: "number",
      name: "calories",
      label: {
        content: "میزان کالری : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: "",
    },

    {
      tag: "bigNumber",
      name: "price",
      label: {
        content: "قیمت (تومان) : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: "",
    },
    {
      tag: "text",
      name: "image",
      label: {
        content: "تصویر : ",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: "",
    },
    {
      tag: "textarea",
      name: "ingredients",
      label: {
        content: "محتویات : ",
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
      title,
      menuCategoryID,
      price,
      description,
      ingredients,
      calories,
      image,
    } = items;

    const newFood: NewFoodDataType = {
      title: String(title),
      menuCategoryID: String(menuCategoryID),
      calories: Number(calories),
      price: Number(String(price).replace(/,/g, "")),
      ingredients: String(ingredients),
      description: String(description),
      image: String(image),
      score: 0,
      scores: [],
      likedUserIDs: [],
      comments: [],
    };

    await addFood(newFood);
    swal({
      text: "آیتم جدید با موفقیت به منو اضافه شد",
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
