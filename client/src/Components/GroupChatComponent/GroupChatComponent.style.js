import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   height: 100vh;
   position: relative;

   .groupChat_Header_div {
      display: none; // header component diplay none
      height: 8%;
      position: absolute;
      margin-bottom: 5rem;
      top: 0;
      left: 0;
      width: 100%;
      background-color: var(--main-cl);
      z-index: 10;

      .groupNameHeading {
         font-size: 25px;
         font-weight: 500;
      }
   }

   svg {
      cursor: pointer;
   }

   @media (max-width: 1000px) {
      .groupChat_Header_div {
         height: 10%;
      }
   }
`;
