import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 90%;
   left: 10px;
   width: 250px;
   background-color: var(--main-cl);
   border-radius: 6px;
   transition: all 0.2s ease;
   overflow: hidden;
   transition: all 0.3s ease;
   visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
   opacity: ${(props) => (props.show ? 1 : 0)};

   /* .overFlow_div {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border: 1px solid red;
      background-color: var(--spec-brand-background-primary);
      z-index: 10;
   } */
`;
