import styled from "styled-components";

export const div = styled.div`
   .file_attached_div {
      position: relative;
      width: max-content;
   }

   .file_div {
      width: max-content;
      padding: 1rem;
      border-radius: 50%;
      cursor: pointer;
   }

   .pinned_projects_div {
      position: relative;

      .options_div {
         position: absolute;
         right: 10px;
         top: 10px;
      }
   }

   .user_profile_div {
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 50%;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   .space_div {
      width: 150px;
      display: flex;
      align-items: center;
   }
`;
