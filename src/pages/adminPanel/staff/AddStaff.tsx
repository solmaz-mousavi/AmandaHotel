import swal from "sweetalert";
import "./staff.scss";
import { useNavigate } from "react-router-dom";
import { FormInputType } from "../../../dataTypes/Input.type";
import { requiredStringValidator } from "../../../validator/rules";
import { ButtonType } from "../../../dataTypes/Button.type";
import { useAddStaffMutation, useGetStaffsQuery } from "../../../app/services/staffApi";
import { useContext } from "react";
import { StaticDataContext } from "../../../context/StaticContext";
import { FormValuesType } from "../../../dataTypes/Form.type";
import { NewStaffDataType } from "../../../dataTypes/Data.type";
import Form from "../../../components/global/form/Form";
import Loader from "../../../components/global/loader/Loader";

export default function AddStaff() {
  const navigate = useNavigate();
		const { staticData } = useContext(StaticDataContext);
  const { data: staff } = useGetStaffsQuery();
  const [addStaff] = useAddStaffMutation();
  if (!staff || !staticData) {
    return <Loader />;
  }

  const inputs: FormInputType[] = [
    {
      tag: "text",
      name: "name",
      label: {
        content: "نام و نام خانوادگی : ",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: "",
    },
				{
					tag: "select",
					name: "role",
					label: {
						content: "نوع خدمت : ",
						color: "#222",
					},
					selectValues: staticData.staffRoles?.map((item) => ({
						id: item,
						value: item,
						title: item,
					})),
					validators: [requiredStringValidator()],
					initialvalue: staticData.staffRoles[0],
				},
    {
      tag: "text",
      name: "image",
      label: {
        content: "تصویر : ",
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
    const { name, role, image, description } = items;

    const newStaff: NewStaffDataType = {
      name: String(name),
      image: String(image),
      role: String(role),
			description: String(description)
    };

    await addStaff(newStaff);
    swal({
      text: "کارمند جدید با موفقیت ثبت شد",
    });
    navigate("/amandaHotel/adminPanel/staff");
  };

  return (
    <div className="addStaff-wrapper container">
      <Form
        inputs={inputs}
        buttons={buttons}
        submitHandler={submitHandler}
        formNotReset={true}
      />
    </div>
  );
}
