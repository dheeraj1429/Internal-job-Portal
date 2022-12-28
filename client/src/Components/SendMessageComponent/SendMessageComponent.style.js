import styled from "styled-components";

export const div = styled.div`
   padding: 1rem;
   max-width: 70%;
   margin: auto;
   position: relative;

   .react-input-emoji--button {
      svg {
         fill: var(--main-cl);
      }
   }

   .show_div {
      visibility: visible;
      opacity: 1;
   }

   .hide_div {
      visibility: hidden;
      opacity: 0;
   }

   .icon_div {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--main-cl);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
         width: 26px;
         height: auto;
      }
   }

   .picker {
      position: absolute !important;
      bottom: 90%;
   }

   .input_div_div {
      width: 100%;
      display: flex;
      align-items: center;
      background-color: var(--main-cl);
      overflow: hidden;

      .icon_div {
         width: 60px;
         height: 40px;
         display: flex;
         justify-content: center;
         align-items: center;
         cursor: pointer;
      }

      input {
         width: 100%;
         height: 40px;
         padding: 1rem;
         outline: none;
      }
   }

   @media (max-width: 600px) {
      max-width: 96%;
   }
`;
