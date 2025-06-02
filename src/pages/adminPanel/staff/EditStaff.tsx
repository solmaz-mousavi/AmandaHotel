import swal from "sweetalert";
import "./staff.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  requiredStringValidator,
} from "../../../validator/rules";
import { FormInputType } from "../../../dataTypes/Input.type";
import { ButtonType } from "../../../dataTypes/Button.type";
import { FormValuesType } from "../../../dataTypes/Form.type";
import Form from "../../../components/global/form/Form";
import {
  useEditStaffMutation,
  useGetStaffQuery,
} from "../../../app/services/staffApi";
import { useContext } from "react";
import { StaticDataContext } from "../../../context/StaticContext";
import { StaffDataType } from "../../../dataTypes/Data.type";
import Loader from "../../../components/global/loader/Loader";

export default function EditStaff() {
  const params = useParams();
  const navigate = useNavigate();
  const { staticData } = useContext(StaticDataContext);
  const { data: staffInfo } = useGetStaffQuery(params.ID || "");
  const [editStaff] = useEditStaffMutation();
  if (!staffInfo || !staticData) {
    return <Loader />;
  }

  const { name, image, role, description } = staffInfo;

  const inputs: FormInputType[] = [
    {
      tag: "text",
      name: "name",
      label: {
        content: "نام و نام خانوادگی : ",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: name,
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
      initialvalue: role,
    },
    {
      tag: "text",
      name: "image",
      label: {
        content: "تصویر : ",
        color: "#222",
      },
      validators: [],
      initialvalue: image,
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
    const newStaff: StaffDataType = {
      ...staffInfo,
      ...items,
    };

    await editStaff(newStaff);
    swal({
      text: "ویرایش اطلاعات با موفقیت انجام شد",
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
