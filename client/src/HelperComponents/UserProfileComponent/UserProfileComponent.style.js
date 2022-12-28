import styled from "styled-components";

export const div = styled.div`
   position: relative;
   visibility: visible;
   opacity: 1;
   transition: all 0.3s ease;

   .overLayDiv {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
   }

   .userProfileDiv {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      z-index: 10;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   p {
      font-size: 12px;
   }

   @media (max-width: 1060px) {
      .userProfileDiv {
         width: 40px;
         height: 40px;
      }
      /* .userProfileInfo {
         display: none;
      } */
   }
`;
