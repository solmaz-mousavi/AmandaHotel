import { useContext, useEffect, useState } from "react";
import {
  useDeleteFoodMutation,
  useGetFoodsQuery,
} from "../../../app/services/foodApi";
import { StaticDataContext } from "../../../context/StaticContext";
import DataTable, {
  TableExpandsType,
  TableRowsType,
} from "../../../components/global/dataTable/DataTable";
import { TableNode } from "@table-library/react-table-library";
import Score from "../../../components/global/score/Score";
import CommentsCount from "../../../components/global/commentsCount/CommentsCount";
import LikesCount from "../../../components/global/likesCount/LikesCount";
import { Link } from "react-router-dom";
import { BiSolidDetail } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import Button from "../../../components/global/button/Button";
import swal from "sweetalert";
import "./menu.scss";
import { useGetUsersQuery } from "../../../app/services/userApi";
import { ScoreDataType } from "../../../dataTypes/Main.type";
import Comment from "../../../components/global/comment/Comment";
import Avatar from "../../../components/global/avatar/Avatar";
import { FoodDataType } from "../../../dataTypes/Data.type";
import FilterData, {
  FilterInfoType,
} from "../../../components/global/filterData/FilterData";
import Loader from "../../../components/global/loader/Loader";

export default function Menu() {
  const { data: menu } = useGetFoodsQuery();
  const { data: users } = useGetUsersQuery();

  const { staticData } = useContext(StaticDataContext);
  const [deleteFood] = useDeleteFoodMutation();

  const [filteredData, setFilteredData] = useState<FoodDataType[]>([]);

  useEffect(() => {
    if (menu && users && staticData) {
      const menuTableData = menu.map((item) => ({
        ...item,
        menuCategory: staticData.menuCategory.find(
          (i) => i.id === item.menuCategoryID
        )?.title,
      }));
      setFilteredData(menuTableData);
    }
  }, [menu, users, staticData]);

  if (!menu || !staticData || !users) {
    return <Loader />;
  }

  const menuTableData = menu.map((item) => ({
    ...item,
    menuCategory: staticData.menuCategory.find(
      (i) => i.id === item.menuCategoryID
    )?.title,
  }));
  const rows: TableRowsType[] = [
    {
      name: "image",
      title: "تصویر ",
      sortType: null,
      content: (a: TableNode) =>
        a.image !== "" ? (
          <div className="table-image">
            <img src={a.image} alt="hotel amanda" />
          </div>
        ) : (
          <></>
        ),
    },
    {
      name: "title",
      title: "عنوان",
      sortType: "string",
      content: (a: TableNode) => a.title,
    },
    {
      name: "menuCategory",
      title: "دسته بندی",
      sortType: "string",
      content: (a: TableNode) => a.menuCategory,
    },
    {
      name: "price",
      title: "قیمت",
      sortType: "number",
      content: (a: TableNode) => a.price.toLocaleString(),
    },
    {
      name: "score",
      title: "نظرات کاربران",
      sortType: "number",
      content: (a: TableNode) => (
        <div className="table-like-comment-score">
          <Score score={a.score} />
          <CommentsCount count={a.comments.length} />
          <LikesCount count={a.likedUserIDs.length} />
        </div>
      ),
    },
    {
      name: "actions",
      title: "",
      sortType: null,
      content: (a: TableNode) => (
        <div className="table-actions-container">
          <Link to={`/AmandaHotel/foodDetails/${a.id}?count=1`} target="_blank">
            <BiSolidDetail
              title="مشاهده جزئیات"
              className="table-action-details"
            />
          </Link>
          <BsTrashFill
            title="حذف"
            className="table-action-delete"
            onClick={() => deleteHandler(a)}
          />
          <Link to={`/AmandaHotel/adminPanel/editFood/${a.id}`} target="_blank">
            <RiEdit2Fill title="ویرایش" className="table-action-edit" />
          </Link>
        </div>
      ),
    },
  ];
  const expands: TableExpandsType[] = [
    {
      name: "orders",
      title: "تعداد سفارش",
      content: (a: TableNode) => 3,
    },
    {
      name: "calories",
      title: "میزان کالری",
      content: (a: TableNode) => a.calories,
    },
    {
      name: "ingredients",
      title: "محتویات",
      content: (a: TableNode) => a.ingredients,
    },
    {
      name: "description",
      title: "توضیحات",
      content: (a: TableNode) => a.description,
    },
    {
      name: "scores",
      title: "مشاهده امتیازات کاربران",
      dropdown: true,
      content: (a: TableNode) => (
        <div className="rooms-scores-wrapper">
          {a.scores.map((item: ScoreDataType, index: number) => {
            const user = users.find((i) => i.id === item.userID);
            if (user) {
              return (
                <div className="user-profile" key={index}>
                  <Avatar user={user} />
                  <Score score={item.score} />
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      ),
    },
    {
      name: "likes",
      title: "مشاهده لایک های کاربران",
      dropdown: true,
      content: (a: TableNode) => (
        <div className="rooms-likes-wrapper">
          {a.likedUserIDs.map((item: string) => {
            const user = users.find((i) => i.id === item);
            if (user) {
              return <Avatar user={user} key={item} />;
            } else {
              return <></>;
            }
          })}
        </div>
      ),
    },
    {
      name: "comments",
      title: "مشاهده کامنت های کاربران",
      dropdown: true,
      content: (a: TableNode) => (
        <div className="rooms-comments-wrapper">
          <Comment comments={a.comments} />
        </div>
      ),
    },
  ];

  const deleteHandler = async (foodInfo: TableNode) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        deleteFood(String(foodInfo.id));
      }
    });
  };

  // ---- filter info
  const selectVals = staticData.menuCategory.map((item) => ({
    id: item.id,
    value: item.id,
    title: item.title,
  }));
  const filterInfo: FilterInfoType[] = [
    {
      inputInfo: {
        name: "menuCategory",
        tag: "select",
        selectValues: [
          { id: "00", value: "all", title: "نمایش همه" },
          ...selectVals,
        ],
        label: {
          content: "دسته بندی : ",
          color: "#999",
        },
        initialvalue: "all",
      },
      filterConditon: (item: FoodDataType, value: string) =>
        item.menuCategoryID === value,
      clearFilterConditon: (value: string) => value === "all",
    },
    {
      inputInfo: {
        name: "title",
        tag: "text",
        label: {
          content: "جستجو در عنوان : ",
          color: "#999",
        },
        initialvalue: "",
      },
      filterConditon: (item: FoodDataType, value: string) =>
        item.title.includes(value.trim()),
      clearFilterConditon: (value: string) => value.trim() === "",
    },
  ];

  return (
    <div className="foods-wrapper">
      <div className="foods-title">
        <h1>لیست غذاهای منوی رستوران:</h1>
        <Button
          type="link"
          link="/AmandaHotel/adminPanel/addFood/"
          target="_blank"
          bgColor="var(--gold-color)"
          className="newItem"
        >
          آیتم جدید{" "}
        </Button>
      </div>
      <FilterData
        data={menuTableData}
        setFilteredData={setFilteredData}
        filterInfo={filterInfo}
      />
      <DataTable
        data={{ nodes: filteredData }}
        rows={rows}
        expands={expands}
      />
    </div>
  );
}
