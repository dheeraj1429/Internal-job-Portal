import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   height: 100vh;
   position: relative;

   .renderDiv {
      height: 100%;
      overflow-x: hidden;
   }

   .user_list_div {
      width: 100%;
      height: 100%;

      .scroll_div {
         width: 100%;
         overflow-x: hidden;
      }
   }

   @media (max-width: 600px) {
      height: 100%;

      .renderDiv {
         height: auto;
      }
   }
`;
