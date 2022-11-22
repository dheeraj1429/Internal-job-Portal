import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: var(--main-cl);
`;

export const formDiv = styled.div`
   width: 900px;
   background-color: var(--main-cl);
   box-shadow: 0 0 10px 1px var(--shadow);
   border-radius: 8px;
   border-radius: 8px;
   overflow: hidden;

   .imag_div {
      width: 100%;
      height: 100%;
      background-image: url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80);
      background-position: center;
      background-size: cover;
   }
`;
