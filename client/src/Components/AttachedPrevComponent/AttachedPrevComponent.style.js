import styled from "styled-components";

export const div = styled.div`
   width: 400px;
   bottom: 60px;
   left: 80px;
   background-color: var(--main-cl);
   padding: 1rem;
   position: absolute;
   z-index: 100;
   border-radius: 10px;
   transition: all 0.2s ease;
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   opacity: ${(props) => (props.show ? "1" : "0")};

   img {
      width: 400px;
      height: auto;
   }
`;
