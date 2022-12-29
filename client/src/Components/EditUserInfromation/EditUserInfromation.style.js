import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   background-color: var(--spec-brand-background-primary);
   display: flex;
   align-items: center;
   justify-content: center;
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   opacity: ${(props) => (props.show ? 1 : 0)};
   transition: all 0.3s ease;

   .mainDiv {
      width: 500px;
      background-color: var(--main-cl);
      border-radius: 5px;
      padding: 2rem;
      overflow-x: hidden;
      position: relative;
      visibility: ${(props) => (props.show ? "visible" : "hidden")};
      opacity: ${(props) => (props.show ? 1 : 0)};
      transform: ${(props) => (props.show ? "scale(1)" : "scale(.7)")};
      transition: all 0.3s ease;

      .closeButtonDiv {
         position: absolute;
         right: 15px;
         top: 15px;
         cursor: pointer;
      }
   }

   @media (max-width: 600px) {
      .mainDiv {
         width: 90%;
         padding: 2rem;
      }
   }
`;
