import styled from 'styled-components';

export const div = styled.div`
   position: relative;

   .userProfileDiv {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   p {
      font-size: 12px;
   }
`;
