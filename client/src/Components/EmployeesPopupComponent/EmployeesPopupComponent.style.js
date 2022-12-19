import styled from "styled-components";

export const div = styled.div`
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   opacity: ${(props) => (props.show ? "1" : "0")};

   .prevEmployeesDiv {
      width: 100%;
      position: absolute;
      left: 0;
      top: 60px;
      height: 300px;
      border-radius: 5px;
      background-color: var(--main-cl);
      overflow-x: hidden;

      .emDiv {
         cursor: pointer;
         padding: 0.5rem 1rem;

         .user_profile_div {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;

            img {
               width: 100%;
               height: 100%;
               object-fit: contain;
            }
         }

         &:hover {
            background-color: var(--spec-text-disabled);
         }
      }

      .paginationFooterDiv {
         position: absolute;
         bottom: 0;
         left: 0;
      }
   }

   .overFlowDiv {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
   }
`;
