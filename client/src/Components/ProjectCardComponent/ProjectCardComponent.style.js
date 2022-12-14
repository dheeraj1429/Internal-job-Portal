import styled from "styled-components";

export const div = styled.div`
   .project_card {
      padding: 1rem;
      position: relative;

      .file_attached_div {
         position: relative;
      }

      .file_div {
         width: max-content;
         padding: 1rem;
         border-radius: 50%;
         cursor: pointer;
      }

      .options_div {
         position: absolute;
         right: 10px;
         top: 10px;
      }

      .space_div {
         width: 120px;
         display: flex;
         align-items: center;

         h5 {
            font-size: 13px;
         }
      }
   }
`;
