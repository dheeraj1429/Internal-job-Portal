import styled from "styled-components";

export const div = styled.div`
   padding: 2rem;

   .image_file_upload_div {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;

      .fie_icons {
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%, -50%);
      }

      input {
         width: 100%;
         height: 100%;
         opacity: 0;
      }
   }

   .attachFilePrev {
      position: relative;

      .close_button {
         position: absolute;
         right: 10px;
         top: 10px;
         width: 30px;
         height: 30px;
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 50%;
      }
   }
`;
