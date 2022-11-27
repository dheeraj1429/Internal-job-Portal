import styled from 'styled-components';

export const div = styled.div`
   h1 {
      font-size: 30px;
      font-weight: 700;
   }
   h2 {
      font-size: 20px;
      font-weight: 600;
   }
   #outlined-multiline {
      width: 60%;
   }
   .checkBoxDiv {
      position: relative;

      input {
         position: absolute;
         right: 41%;
         top: 10px;
      }
   }
   .selectDiv {
      width: 60%;
      border-radius: 10px;
      position: relative;

      .rightPgn {
         position: absolute;
         right: 10px;
         top: 10px;
         width: auto;
         height: 20px;
      }

      @media (max-width: 1500px) {
         width: 100%;
      }

      @media (max-width: 1000px) {
         width: 100%;
      }
   }
   .recommed {
      background-color: var(--spec-icon-inactive);
      padding: 0.2rem;
      color: var(--main-cl);
      font-size: 13px;
   }
   .updateResume {
      border-radius: 7px;
      cursor: pointer;
      position: relative;

      input {
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         opacity: 0;
      }
   }
   .fit {
      width: max-content;
   }
`;
