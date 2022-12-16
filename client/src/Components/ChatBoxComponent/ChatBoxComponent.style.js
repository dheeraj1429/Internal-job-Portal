import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   height: 92%;

   .chatBox {
      position: relative;
      height: 92%;
      overflow-x: hidden;
      padding: 3rem;
      padding-bottom: 2rem;

      .scroll {
         width: 100%;
         height: 100%;
         overflow: hidden;
         overflow-x: hidden;
         overflow-y: scroll;
      }
   }

   @media (max-width: 1000px) {
      .chatBox {
         height: 89%;
      }
   }
`;
