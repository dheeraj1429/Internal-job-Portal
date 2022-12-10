import styled from 'styled-components';
export const div = styled.div`
   width: 20%;
   height: 100%;
   padding-top: 1rem;
   transition: all 0.3s ease;

   @media (max-width: 1000px) {
      width: 15%;
   }
   @media (max-width: 400px) {
      width: 14%;
   }
`;
