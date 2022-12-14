import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   overflow: hidden;

   .searchButton_div {
      width: 40px;
      height: 40px;
      align-items: center;
      display: flex;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      background-color: var(--main-cl);

      &:hover {
         background-color: var(--spec-call-to-action);

         svg {
            color: var(--main-cl);
         }
      }
   }

   input {
      width: 100%;
      height: 40px;
      outline: none;
   }
`;
