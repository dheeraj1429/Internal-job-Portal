import styled from "styled-components";

export const div = styled.div``;

export const userProfileDiv = styled.div`
   .profile {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
   }

   p {
      font-size: 12px;
   }
`;

export const chatMessageDiv = styled.div`
   padding: 0.8rem;
   max-width: 500px;
   margin-top: 1rem;
   border-radius: 5px;

   p {
      font-size: 14px;
      line-height: 26px;
   }
`;
