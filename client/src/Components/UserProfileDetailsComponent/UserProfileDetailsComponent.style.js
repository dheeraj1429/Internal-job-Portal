import styled from "styled-components";

export const div = styled.div`
   .user_profile_div {
      width: 190px;
      height: 190px;
      border-radius: 50%;
      background-color: var(--main-cl);
      overflow: hidden;
      position: absolute;
      top: -100px;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   @media (max-width: 1600px) {
      .user_profile_div {
         width: 140px;
         height: 140px;
         position: relative;
         top: 0;
      }
   }
`;
