import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   height: 100vh;

   .groupChat_Header_div {
      height: 8%;

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
