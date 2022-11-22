import styled from 'styled-components';

export const div = styled.div`
   padding: 0.8rem 1rem;
   position: relative;
   cursor: pointer;

   &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background-color: ${(props) => (props.active ? 'var(--spec-brand-link-text)' : null)};
   }

   svg {
      fill: var(--main-cl);
      font-size: 18px;
   }

   p {
      color: var(--main-cl);
      margin: 0;
   }
`;
