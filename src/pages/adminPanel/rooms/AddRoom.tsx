import React from 'react'
import { RoomDataType } from '../../../dataTypes/Data.type'
import { FormInputType } from '../../../dataTypes/Input.type';
import { requiredNumberValidator } from '../../../validator/rules';
import { ButtonType } from '../../../dataTypes/Button.type';
import { FormValuesType } from '../../../dataTypes/Form.type';
import Form from '../../../components/global/form/Form';

export default function AddRoom({roomInfo}:{roomInfo?:RoomDataType}) {
	// 	const { staticData } = useContext(StaticDataContext);
	// 	const { userInfo } = useContext(AuthContext);
	// 	const params = useParams();
	// 	const { data: roomInfo } = useGetRoomQuery(params.ID || "");
	// 	const [editRoom] = useEditRoomMutation();
	// 	if (!roomInfo || !userInfo || !staticData || !params) {
	// 		return <PageHeader title="مشکلی پیش امده، لطفا صفحه را ریفرش کنید" />;
	// 	}
	
	// 	const {
	// 		roomNumber,
	// 		floor,
	// 		roomTypeID,
	// 		capacity,
	// 		price,
	// 		pricePerAddedPerson,
	// 		maxAddedPeople,
	// 		description,
	// 		score,
	// 		images,
	// 		comments,
	// 	} = roomInfo;
	
	// 	const strength = new URLSearchParams(window.location.search).get("strength");
	// 	const roomType = staticData.roomCategory.find(
	// 		(item) => item.id === roomTypeID
	// 	)?.title;




	//   const inputs: FormInputType[] = [
  //   {
  //     tag: "number",
  //     name: "roomNumber",
  //     label: {
  //       content: "شماره اتاق",
  //       color: "#222",
  //     },
  //     validators: [requiredNumberValidator()],
  //     initialvalue: roomInfo?.roomNumber || "",
  //   },
	// 	    {
  //     tag: "number",
  //     name: "floor",
  //     label: {
  //       content: "طبقه",
  //       color: "#222",
  //     },
  //     validators: [requiredNumberValidator()],
  //     initialvalue: roomInfo?.floor || "",
  //   },

  // ];
  // const buttons: ButtonType[] = [
  //   {
  //     innerHtml: "مشاهده اتاق های خالی",
  //     type: "submit",
  //     bgColor: "var(--gold-color)",
  //   },
  // ];
  // const submitHandler = (items: FormValuesType) => {
    // const { strength, enterDate, exitDate } = items;
    // const reqDates = getDateArray({ startDate: enterDate, endDate: exitDate });

    // if (roomReservations && rooms) {
    //   const reservedRoomIDs = roomReservations
    //     .filter((item) => intersection(reqDates, item.dates).length>0)
    //     .map((i) => i.roomID);

    //   const result = [...rooms].filter(
    //     ({ id, capacity, maxAddedPeople }) =>
    //       Number(strength) <= capacity + maxAddedPeople &&
    //       !reservedRoomIDs.includes(id)
    //   );
    //   setSearchResults(result);
    //   setFilteredData(result);
    //   setShowResults(true);

    //   setFormInfo({ ...items, reqDates });
    // } else {
    //   swal({
    //     text: "مشکلی در سمت سرور پیش آمده، لطفاً مجدادا تلاش کنید",
    //     buttons: ["باشه"],
    //   });
    // }
  // };
	return (
		<div>

				{/* <Form
					inputs={inputs}
					buttons={buttons}
					submitHandler={submitHandler}
					formNotReset={true}
				/> */}




		</div>
	)
}
