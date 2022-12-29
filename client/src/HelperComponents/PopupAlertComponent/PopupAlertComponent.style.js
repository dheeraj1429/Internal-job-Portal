import styled from "styled-components";

export const div = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: var(--spec-brand-background-primary);
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   opacity: ${(props) => (props.show ? 1 : 0)};
   transition: all 0.3s ease;
   z-index: 100;
`;

export const mainDiv = styled.div`
   background-color: var(--main-cl);
   padding: 2rem;
   border-radius: 5px;
   display: flex;
   align-items: center;
   justify-content: center;
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   opacity: ${(props) => (props.show ? 1 : 0)};
   transition: all 0.3s ease;
   transform: ${(props) => (props.show ? "scale(1)" : "scale(.5)")};
   p {
      /* color: var(--spec-static-brand-black); */
   }
   .success-message {
      text-align: center;
      max-width: 500px;
   }
   .success-message__icon {
      max-width: 75px;
   }
   .success-message__title {
      color: #3dc480;
      transform: translateY(25px);
      opacity: 0;
      transition: all 200ms ease;
   }
   .active .success-message__title {
      transform: translateY(0);
      opacity: 1;
   }
   .success-message__content {
      color: #b8babb;
      transform: translateY(25px);
      opacity: 0;
      transition: all 200ms ease;
      transition-delay: 50ms;
   }
   .active .success-message__content {
      transform: translateY(0);
      opacity: 1;
   }
   .icon-checkmark circle {
      fill: #3dc480;
      transform-origin: 50% 50%;
      transform: scale(0);
      transition: transform 200ms cubic-bezier(0.22, 0.96, 0.38, 0.98);
   }
   .icon-checkmark path {
      transition: stroke-dashoffset 350ms ease;
      transition-delay: 100ms;
   }
   .active .icon-checkmark circle {
      transform: scale(1);
   }
`;
