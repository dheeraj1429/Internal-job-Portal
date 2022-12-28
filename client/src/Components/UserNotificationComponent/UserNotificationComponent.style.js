import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   padding: 1rem;

   .user_image_div {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;

      img {
         width: 100%;
         height: auto;
         object-fit: cover;
      }
   }

   .sm_im {
      width: 40px;
      height: 40px;
   }

   .nf_div {
      width: fit-content;
      padding: 0.2rem 0.5rem;
      border-radius: 5px;
   }

   .notification_content {
      h5 {
         font-size: 15px;
      }
      p {
         font-size: 12px;
      }
   }
`;
