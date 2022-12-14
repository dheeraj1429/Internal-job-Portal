import styled from "styled-components";

export const div = styled.div`
   cursor: pointer;
   max-height: ${(props) => (props.show ? "500px" : "45px")};
   transition: all 0.3s ease;
   overflow: hidden;

   .rotate_cl {
      rotate: 90deg;
   }
`;
