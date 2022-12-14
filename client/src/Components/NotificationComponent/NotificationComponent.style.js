import styled from "styled-components";

export const div = styled.div`
   position: absolute;
   right: ${(props) => (props.show ? "20px" : "10%")};
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   opacity: ${(props) => (props.show ? 1 : 0)};
   bottom: 20px;
   width: 300px;
   padding: 0.5rem;
   transition: all 0.3s ease;
`;
