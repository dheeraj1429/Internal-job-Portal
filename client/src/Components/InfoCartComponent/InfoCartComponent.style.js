import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   padding: 2rem;
   text-align: center;
   background-image: ${(props) =>
      props.active
         ? `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)),
      url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80);`
         : null};
   background-position: center;
   background-size: cover;
   border-radius: 10px;
   height: 100%;

   h5 {
      font-size: ${(props) => (!props.active ? '40px' : '16px')};
      color: ${(props) => (props.active ? 'var(--main-cl)' : null)};
   }
   h4 {
      font-size: ${(props) => (!props.active ? '16px' : '20px')};
      color: ${(props) => (props.active ? 'var(--main-cl)' : null)};
   }

   .imageDiv {
      width: 100px;
      height: 100px;
      padding: 1rem;
      border-radius: 50%;
      background-color: var(--smooth-gry-cl);

      img {
         width: 100%;
         height: 100%;
      }
   }
`;
