import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   height: 100%;
   justify-content: center;
   display: flex;
   align-items: center;
   position: fixed;
   top: 0;
   left: 0;
   background-color: var(--spec-general-background-a);
   z-index: 100;
   visibility: "visible";
   opacity: "1";
   transition: all 0.3s ease;
`;

export const mainDiv = styled.div`
   width: 700px;
   padding: 1rem;
   background: rgba(255, 255, 255, 0.46);
   border-radius: 8px;
   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
   backdrop-filter: blur(5px);
   -webkit-backdrop-filter: blur(5px);
   border: 1px solid rgba(255, 255, 255, 1);
   visibility: "visible";
   opacity: "1";

   .user_list_div {
      padding: 0.6rem;
   }

   .image_div {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   .userInfo_div {
      h5 {
         font-size: 15px;
      }
   }

   .add_button {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
      background-color: var(--main-cl);
   }

   @media (max-width: 500px) {
      width: 90%;
   }
`;
