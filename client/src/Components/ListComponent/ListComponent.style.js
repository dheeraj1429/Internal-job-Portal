import styled from "styled-components";

export const div = styled.div`
   .space_div {
      width: 200px;
   }

   @media (max-width: 600px) {
      .space_div {
         width: 100px;

         p {
            font-size: 12px;
         }

         span {
            font-size: 13px;
         }
      }
   }
`;
