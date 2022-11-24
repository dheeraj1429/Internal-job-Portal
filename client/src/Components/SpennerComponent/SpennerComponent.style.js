import styled from 'styled-components';

export const div = styled.div`
   position: ${(props) => (props.center ? 'absolute' : 'relative')};
   left: ${(props) => (props.center ? '50%' : '0%')};
   top: ${(props) => (props.center ? '50%' : '0%')};
   transform: ${(props) => (props.center ? 'translate(-50%, -50%)' : 'none')};
   img {
      width: auto;
      height: 40px;
   }
`;
