import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: var(--main-cl);
   background-image: url(https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80);
   background-position: center;
   background-size: cover;
`;

export const formDiv = styled.div`
   width: 450px;
   background: rgba(255, 255, 255, 0.63);
   border-radius: 16px;
   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
   backdrop-filter: blur(7.5px);
   -webkit-backdrop-filter: blur(7.5px);
   border: 1px solid rgba(255, 255, 255, 0.92);
   border-radius: 8px;
   border-radius: 8px;
   overflow: hidden;
`;
