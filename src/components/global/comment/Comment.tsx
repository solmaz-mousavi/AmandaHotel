import "./comment.scss";
import { useState } from "react";
import { useGetUsersQuery } from "../../../app/services/userApi";
import { VscTriangleDown } from "react-icons/vsc";
import { CommentDataType } from "../../../dataTypes/Main.type";
import { FaUserCircle } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";
import { BsCalendar3 } from "react-icons/bs";
import Pagination from "../pagination/Pagination";

export default function Comment({ comments }: { comments: CommentDataType[] }) {
  // datas:
  const { data: users } = useGetUsersQuery();
	const reversedComments = [...comments].reverse();
  // pagination states:
  const [startIndex, setStartIndex] = useState(0);
  const perPage = 2;

  return (
    <div className="allComments-wrapper">
      <div className="allComments-title">
        <VscTriangleDown className="allComments-icon" />
        <h3>
          نظرات کاربران
          {"  ("}
          {reversedComments.length || "اولین نفری باشید که نظر می دهید"}
          {")"}
        </h3>
      </div>

      {/* show comments */}
      {reversedComments && users && reversedComments.length > 0 && (
        <>
          <div
            className="comments-wrapper animate__animated animate__fadeInRight"
            key={startIndex}
          >
            {reversedComments.slice(startIndex, startIndex + perPage).map((item) => {
              const user = users.find((i) => i.id === item.userID);

              return (
                user && (
                  <div className="comment-container" key={item.id}>
                    <div className="comment-user">
                      {user.image ? (
                        <img src={user.image} alt={user.name} />
                      ) : (
                        <FaUserCircle className="comment-user-icon" />
                      )}

                      <div className="comment-user-details">
                        <p>{user.name}</p>
                        <div>
                          <TbUsers className="comment-icon" />
                          <span className="comment-detail">
                            {"("}
                            {user.role}
                            {")"}
                          </span>
                        </div>
                        <div>
                          <BsCalendar3 className="comment-icon" />
                          <span className="comment-detail">{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="comment-desc">{item.desc}</p>
                  </div>
                )
              );
            })}
          </div>

          <div className="pagination-wrapper">
            <Pagination
              dataLength={reversedComments.length}
              perPage={perPage}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
            />
          </div>
        </>
      )}
    </div>
  );
}
