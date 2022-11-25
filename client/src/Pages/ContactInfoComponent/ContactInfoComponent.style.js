import styled from 'styled-components';

export const div = styled.div`
   h1 {
      font-size: 40px;
      font-weight: 700;
   }
   .fixWidth {
      width: max-content;
   }
   h5 {
      font-size: 20px;
   }
   .imageUpdateDiv {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;

      input {
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         opacity: 0;
      }

      img {
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
   }
`;
