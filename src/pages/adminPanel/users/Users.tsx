import { useContext } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../app/services/userApi";
import "./users.scss";
import swal from "sweetalert";
import { StaticDataContext } from "../../../context/StaticContext";
import DataTable, {
  TableExpandsType,
  TableRowsType,
} from "../../../components/global/dataTable/DataTable";
import { TableNode } from "@table-library/react-table-library";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import Button from "../../../components/global/button/Button";

export default function Users() {
  const { data: users } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  if (!users ) {
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
          <></>
        ),
    },
    {
      name: "name",
      title: "نام و نام خانوادگی",
      sortType: "string",
      content: (a: TableNode) => a.name,
    },
    {
      name: "phone",
      title: "شماره موبایل",
      sortType: null,
      content: (a: TableNode) => a.phone,
    },
    {
      name: "email",
      title: "آدرس ایمیل",
      sortType: null,
      content: (a: TableNode) => a.email,
    },
    {
      name: "role",
      title: "نوع کاربر",
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
          <Link to={`/AmandaHotel/adminPanel/editUser/${a.id}`} target="_blank">
            <RiEdit2Fill title="ویرایش" className="table-action-edit" />
          </Link>
        </div>
      ),
    },
  ];
  const expands: TableExpandsType[] = [

	];
  const deleteHandler = async (userInfo: TableNode) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        deleteUser(String(userInfo.id));
      }
    });
  };

  return (
    <div className="users-wrapper">
      <div className="users-title">
        <h1>لیست کاربران سایت:</h1>
        <Button
          type="link"
          link="/AmandaHotel/adminPanel/addUser/"
          target="_blank"
          bgColor="var(--gold-color)"
          className="newItem"
        >
          کاربر جدید{" "}
        </Button>
      </div>
      <DataTable data={{ nodes: users }} rows={rows} expands={expands} />
    </div>
  );
}
