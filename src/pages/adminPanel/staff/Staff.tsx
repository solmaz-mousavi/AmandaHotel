import swal from "sweetalert";
import "./staff.scss";
import { useDeleteStaffMutation, useGetStaffsQuery } from "../../../app/services/staffApi";
import DataTable, { TableExpandsType, TableRowsType } from "../../../components/global/dataTable/DataTable";
import { TableNode } from "@table-library/react-table-library";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import Button from "../../../components/global/button/Button";
import { FaUserCircle } from "react-icons/fa";

export default function Staff() {
  const { data: staff } = useGetStaffsQuery();
  const [deleteStaff] = useDeleteStaffMutation();

  if (!staff ) {
    return <></>;
  }

  const rows: TableRowsType[] = [
    {
      name: "image",
      title: "تصویر ",
      sortType: null,
      content: (a: TableNode) =>
        a.image !== "" ? (
          <div className="table-image">
            <img src={a.image} alt={a.name} />
          </div>
        ) : (
          <FaUserCircle className="avatar-withoutphoto" />
        ),
    },
    {
      name: "name",
      title: "نام و نام خانوادگی",
      sortType: "string",
      content: (a: TableNode) => a.name,
    },
    {
      name: "role",
      title: "نوع خدمت",
      sortType: "string",
      content: (a: TableNode) => a.role,
    },
    {
      name: "actions",
      title: "",
      sortType: null,
      content: (a: TableNode) => (
        <div className="table-actions-container">
          <BsTrashFill
            title="حذف"
            className="table-action-delete"
            onClick={() => deleteHandler(a)}
          />
          <Link to={`/AmandaHotel/adminPanel/editStaff/${a.id}`} target="_blank">
            <RiEdit2Fill title="ویرایش" className="table-action-edit" />
          </Link>
        </div>
      ),
    },
  ];
  const expands: TableExpandsType[] = [
				{
					name: "description",
					title: "توضیحات",
					content: (a: TableNode) => a.description,
				},
	];
  const deleteHandler = async (staffInfo: TableNode) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        deleteStaff(String(staffInfo.id));
      }
    });
  };

  return (
    <div className="staff-wrapper">
      <div className="staff-title">
        <h1>لیست کارکنان هتل:</h1>
        <Button
          type="link"
          link="/AmandaHotel/adminPanel/addStaff/"
          target="_blank"
          bgColor="var(--gold-color)"
          className="newItem"
        >
          کارمند جدید{" "}
        </Button>
      </div>
      <DataTable data={{ nodes: staff }} rows={rows} expands={expands} />
    </div>
  );
}
