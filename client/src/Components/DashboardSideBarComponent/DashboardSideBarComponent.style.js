import styled from "styled-components";

export const div = styled.div`
   width: 25%;
   height: 100%;
   padding-top: 1rem;
   transition: all 0.3s ease;

   .sidebarToggleButton {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: var(--main-cl);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: fixed;
      right: 10px;
      top: 10px;
      z-index: 200;
      visibility: hidden;
      opacity: 0;
   }

   @media (max-width: 1000px) {
      width: 30%;
   }
   @media (max-width: 500px) {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      .sidebarToggleButton {
         opacity: 1;
         visibility: visible;
      }
   }
`;
