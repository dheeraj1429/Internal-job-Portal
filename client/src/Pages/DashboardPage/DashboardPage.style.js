import styled from "styled-components";

export const div = styled.div`
   .Mini_sidebar {
      width: 0%;

      /* p {
         display: none;
      }

      h5 {
         display: none;
      } */

      /* .padding_side_bar {
         padding: 0;
      } */

      .profile_div {
         opacity: 0;
         visibility: hidden;
      }
   }

   @media (min-width: 600px) {
      .Mini_sidebar {
         width: 30%;
      }
      .profile_div {
         opacity: 1 !important;
         visibility: visible !important;
      }
   }
`;

export const renderDiv = styled.div`
   width: 100%;
   height: 100vh;
   overflow-x: hidden;
   background-color: var(--main-cl);
   /* padding: 2rem; */
`;
