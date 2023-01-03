import styled from "styled-components";

export const div = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: var(--spec-brand-background-primary);
   z-index: 100;
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   opacity: ${(props) => (props.show ? "1" : "0")};
`;

export const mainDiv = styled.div`
   width: 550px;
   padding: 2rem;
   border-radius: 5px;
   background-color: var(--main-cl);
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   opacity: ${(props) => (props.show ? "1" : "0")};
   transition: all 0.2s ease;
   transform: ${(props) => (props?.show ? "scale(1)" : "scale(.8)")};

   .close_button {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
   }

   @media (max-width: 600px) {
      width: 90%;
   }
`;

export const groupDiv = styled.div`
   .group_icons_div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
   }

   h5 {
      font-size: 16px;
   }
`;
