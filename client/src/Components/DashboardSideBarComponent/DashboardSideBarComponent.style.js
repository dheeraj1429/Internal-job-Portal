import styled from "styled-components";

export const div = styled.div`
   width: 25%;
   height: 100%;
   padding-top: 1rem;
   transition: all 0.3s ease;

   .bar_div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: var(--main-cl);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
   }

   @media (max-width: 1000px) {
      width: 15%;
   }
   @media (max-width: 400px) {
      width: 14%;
   }
`;
