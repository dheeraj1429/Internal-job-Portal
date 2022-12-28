import styled from "styled-components";

export const div = styled.div`
   cursor: pointer;
   max-height: ${(props) => (props.show ? "500px" : "45px")};
   transition: all 0.3s ease;
   overflow: hidden;

   .tab_icons {
      svg {
         font-size: 18px;
      }
   }

   .padding_side_bar {
      padding: 0 2rem;
      transition: all 0.3s ease;
   }

   svg {
      font-size: 20px;
      color: var(--main-cl);
   }

   .rotate_cl {
      rotate: 90deg;
   }

   @media (max-width: 1100px) {
      .padding_side_bar {
         padding: 0 1rem;
      }
   }
`;
