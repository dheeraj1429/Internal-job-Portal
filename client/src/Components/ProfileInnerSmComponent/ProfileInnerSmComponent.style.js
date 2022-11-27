import styled from 'styled-components';

export const div = styled.div`
   padding: 0.6rem 1rem;
   cursor: pointer;
   transition: all 0.2s ease;
   position: relative;

   &:hover {
      background-color: var(--smooht-gray-cl);
   }

   .csvDiv {
      width: 40px;
   }
   svg {
      font-size: 20px;
   }
`;
