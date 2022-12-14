import styled from "styled-components";

export const div = styled.div`
   padding: 0.8rem 1rem;
   position: relative;
   cursor: pointer;
   display: flex;
   justify-content: center;
   align-items: center;

   &::before {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background-color: ${(props) => (props.active ? "var(--spec-brand-link-text)" : null)};
   }

   svg {
      font-size: 20px;
      color: var(--main-cl);
   }

   .user_Profile {
      width: 30px;
      height: 30px;
      border-radius: 50px;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   @media (max-width: 1100px) {
      svg {
         font-size: 14px;
      }
   }
`;
