import styled from 'styled-components';

export const div = styled.div`
   h1 {
      font-size: 25px;
   }
   .updateResume {
      border: 1px solid var(--spec-brand-icon-inactive);
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
`;
