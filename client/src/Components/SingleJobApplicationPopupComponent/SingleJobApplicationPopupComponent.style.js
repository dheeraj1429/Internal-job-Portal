import styled from "styled-components";

export const div = styled.div`
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   background-color: var(--spec-brand-background-primary);
   display: flex;
   align-items: center;
   justify-content: center;
   transition: all 0.2s ease;
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   opacity: ${(props) => (props.show ? "1" : "0")};
   z-index: 10;

   .mainDiv {
      width: 80%;
      height: 70%;
      background-color: var(--main-cl);
      position: relative;
      transition: all 0.3s ease;
      visibility: ${(props) => (props.show ? "visible" : "hidden")};
      opacity: ${(props) => (props.show ? "1" : "0")};
      transform: ${(props) => (props.show ? "scale(1)" : "scale(.6)")};
      z-index: 20;
      overflow-x: hidden;

      .closeBtnDiv {
         position: absolute;
         right: 20px;
         top: 20px;

         svg {
            font-size: 20px;
            cursor: pointer;
         }
      }

      h1 {
         font-size: 25px;
      }

      .user_Profile_div {
         width: 60px;
         height: 60px;
         border-radius: 50%;
         overflow: hidden;

         img {
            width: 100%;
            height: 100%;
            object-fit: contain;
         }
      }

      .topDiv {
         display: flex;
         align-items: center;
         flex-wrap: wrap;
      }

      .skill_Round_div {
         width: fit-content;
         padding: 0.3rem 1rem;
         border-radius: 5px;
         font-size: 14px;
         margin-right: 1rem;
      }

      .sm_downloda {
         width: 10px;
      }
   }

   @media (max-width: 600px) {
      h1 {
         font-size: 20px !important;
      }
      p {
         font-size: 13px;
      }
   }
`;
