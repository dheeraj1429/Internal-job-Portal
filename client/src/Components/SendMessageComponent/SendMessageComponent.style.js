import styled from "styled-components";

export const div = styled.div`
   padding: 1rem;
   max-width: 50%;
   margin: auto;

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
`;
