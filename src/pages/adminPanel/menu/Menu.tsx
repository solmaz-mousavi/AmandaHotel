import { useContext } from "react";
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


export default function Menu() {
  const { data: menu } = useGetFoodsQuery();
  const { data: users } = useGetUsersQuery();

  const { staticData } = useContext(StaticDataContext);
  const [deleteFood] = useDeleteFoodMutation();

  if (!menu || !staticData || !users) {
    return <></>;
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
					dropdown:true,
					content: (a: TableNode) => (
						<div className="rooms-scores-wrapper">
							{a.scores.map((item: ScoreDataType, index:number) => {
								const user = users.find((i) => i.id === item.userID);
						if (user) {
							return (
								<div className="user-profile" key={index}>
									<Avatar user={user} />
									<Score score={item.score} />
								</div>
							);
						}
							})}
						</div>
					),
				},
				{
					name: "likes",
					title: "مشاهده لایک های کاربران",
					dropdown:true,
					content: (a: TableNode) => (
						<div className="rooms-likes-wrapper">
							{a.likedUserIDs.map((item:string) => {
								const user = users.find((i) => i.id === item);
						if (user) {
							return <Avatar user={user} />;
						}
							})}
						</div>
					),
				},
				{
					name: "comments",
					title: "مشاهده کامنت های کاربران",
					dropdown:true,
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
      <DataTable
        data={{ nodes: menuTableData }}
        rows={rows}
        expands={expands}
      />
    </div>
  );
}
