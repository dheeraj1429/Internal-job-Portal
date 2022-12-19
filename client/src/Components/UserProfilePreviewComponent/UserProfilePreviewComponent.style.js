import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   padding: 0.8rem 1.2rem;

   .user_profile_div {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      cursor: pointer;
      position: relative;

      .online_status {
         width: 10px;
         height: 10px;
         position: absolute;
         bottom: 0;
         right: 0;
         border-radius: 50%;
      }

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
         border-radius: 50%;
      }
   }

   .user_content_info_div {
      p {
         font-size: 12px;
      }
   }

   .close_button_div {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
      position: relative;
      cursor: pointer;

      .hover_div {
         width: max-content;
         position: absolute;
         background-color: var(--dark-cl);
         padding: 0.2rem;
         border-radius: 3px;
         top: -40px;
         visibility: hidden;
         opacity: 0;
         transition: all 0.2s ease;

         p {
            color: var(--main-cl);
            font-size: 10px;
         }
      }

      &:hover {
         background-color: var(--spec-call-to-action);

         .hover_div {
            top: -30px;
            visibility: visible;
            opacity: 1;
         }

         svg {
            color: var(--main-cl);
         }
      }
   }
`;
