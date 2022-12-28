import styled from "styled-components";

export const div = styled.div`
   h1 {
      font-size: 35px;
      margin-bottom: 0.2rem;
   }
   p {
      font-size: 13px;
   }

   @media (max-width: 500px) {
      h1 {
         font-size: 25px;
      }
      p {
         font-size: 12px;
      }
   }
`;
