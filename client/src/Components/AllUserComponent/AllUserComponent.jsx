import React, { useEffect, useState } from "react";
import HeadingComponent from "../../HelperComponents/HeadingComponent/HeadingComponent";
import * as styled from "./AllUserComponent.style";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLoginUsers,
  deleteUserAccount,
  removeAccountInfo,
} from "../../App/Features/Admin/adminSlice";
import { useCookies } from "react-cookie";
import { row } from "./TableData";
import SpennerComponent from "../../HelperComponents/SpennerComponent/SpennerComponent";
import dayjs from "dayjs";
import EditUserInfromation from "../EditUserInfromation/EditUserInfromation";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { message, Popconfirm } from "antd";
import PaginationFooterComponent from "../PaginationFooterComponent/PaginationFooterComponent";

function AllUserComponent() {
  const [cookie] = useCookies(["_ijp_at_user"]);
  const [ShowInfoPopup, setShowInfoPopup] = useState(false);
  const [SelectedUser, setSelectedUser] = useState("");

  const dispatch = useDispatch();

  const ShowPopUpHandler = function (event) {
    setShowInfoPopup(event);
  };

  const {
    allUsers,
    allUsersFetchLoading,
    allUsersFetchError,
    userAccountDeleteInfo,
    userAccountDeleteLoading,
    userAccountDeleteError,
  } = useSelector((state) => state.admin);

  const confirm = (id) => {
    if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
      dispatch(
        deleteUserAccount({
          token: cookie?._ijp_at_user?.token,
          userId: id,
        })
      );
    }
  };

  useEffect(() => {
    if (!!userAccountDeleteInfo && userAccountDeleteInfo.success) {
      message.success(userAccountDeleteInfo.message);
    } else if (!!userAccountDeleteInfo && !userAccountDeleteInfo.success) {
      message.info(userAccountDeleteInfo.message);
    }
  }, [userAccountDeleteInfo]);

  useEffect(() => {
    if (!!cookie && cookie?._ijp_at_user && cookie?._ijp_at_user?.token) {
      dispatch(getAllLoginUsers({ token: cookie?._ijp_at_user?.token }));
    }
    return () => {
      dispatch(removeAccountInfo());
    };
  }, []);

  return (
    <styled.div className="sidePaddingOne">
      <EditUserInfromation show={ShowInfoPopup} eventClick={ShowPopUpHandler} user={SelectedUser} />
      <HeadingComponent
        heading={"All Users"}
        subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
      />
      {!!allUsersFetchLoading ? (
        <div>
          <SpennerComponent />
        </div>
      ) : !allUsersFetchLoading && !!allUsers && allUsers?.success && allUsers?.users?.length ? (
        <div className="mt-5">
          <table>
            <tr>
              {row.map((el) => (
                <th className=" text-gray-600" key={el.value.replaceAll(" ", "-")}>
                  {el.value}
                </th>
              ))}
            </tr>
            {allUsers?.users.map((el) => (
              <tr className=" shadow-sm" key={el._id}>
                <td>
                  <div className="user_images">
                    <img src={`/usersProfileCompress/${el.userProfile}`} alt="" />
                  </div>
                </td>
                <td className=" text-sm text-gray-500">{el.name}</td>
                <td className=" text-sky-600">{el.email}</td>
                <td className=" text-sm text-gray-500">{el.role}</td>
                <td className=" text-sm text-gray-500">{el.showNumber ? "Yes" : "No"}</td>
                <td className=" text-sm text-gray-500">
                  {dayjs(el.createdAt).format("YY/MM/DD h:m:s A")}
                </td>
                <td>
                  <div className=" flex items-center">
                    <AiOutlineEye
                      className=" cursor-pointer me-2"
                      onClick={() => {
                        ShowPopUpHandler(true);
                        setSelectedUser(el);
                      }}
                    />
                    <Popconfirm
                      title="Are you sure to delete this account"
                      onConfirm={() => confirm(el._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <MdDelete className=" cursor-pointer" />
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div className="mt-3">
          <p className=" text-gray-600">No Users</p>
        </div>
      )}
      <PaginationFooterComponent action={getAllLoginUsers} data={allUsers} filed={"users"} />
      {!!allUsersFetchError && !allUsers ? (
        <div className="mt-3 text-red-400">
          <p>{allUsersFetchError}</p>
        </div>
      ) : null}
      {!!userAccountDeleteError ? (
        <div className="mt-3 text-red-400">
          <p>{userAccountDeleteError}</p>
        </div>
      ) : null}
    </styled.div>
  );
}

export default AllUserComponent;
