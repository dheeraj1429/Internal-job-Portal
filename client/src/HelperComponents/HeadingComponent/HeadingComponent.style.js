import styled from "styled-components";

export const div = styled.div`
   h1 {
      font-size: 30px;
      margin-bottom: 0.8rem;
   }

   @media (max-width: 1000px) {
      h1 {
         font-size: 27px;
      }
      p {
         font-size: 15px;
      }
   }
   @media (max-width: 700px) {
      h1 {
         font-size: 23px;
      }
      p {
         font-size: 12px;
         line-height: 24px;
      }
   }
   @media (max-width: 400px) {
      h1 {
         font-size: 20px;
      }
   }
`;
