import styled from "styled-components";

export const div = styled.div`
   .jobPostCart {
      h5 {
         font-size: 23px;
      }
      p {
         font-size: 14px;
      }
      span {
         font-size: 13px;
      }
   }

   svg {
      cursor: pointer;
      color: var(--spec-icon-disabled);
   }
   .svgBlue {
      color: var(--google-button-cl);
   }
   .css-1e6y48t-MuiButtonBase-root-MuiButton-root {
      display: flex;
      justify-content: end;
   }

   @media (max-width: 500px) {
      .jobPostCart {
         h5 {
            font-size: 18px;
         }
      }
   }
`;
