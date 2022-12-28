import styled from "styled-components";

export const div = styled.div`
   padding: 2rem;
   position: relative;
   width: 100%;
   height: 100%;

   h1 {
      font-size: 35px;
   }
   .flexDiv {
      width: 140px;
   }
   p {
      font-size: 14px;
   }

   @media (max-width: 500px) {
      padding: 1rem;
      h1 {
         font-size: 27px;
      }
   }
`;
