import styled from "styled-components";

export const div = styled.div`
   padding: 0 1rem;

   .user_notification_div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .messageChat_div {
         background-color: transparent;
         box-shadow: none !important;
         padding: 0;
         margin: 0;
         margin-left: 1rem;

         p {
            color: var(--main-cl);
         }
      }
   }
`;

export const userProfileDiv = styled.div`
   .profile {
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

   p {
      font-size: 12px;
   }
`;

export const chatMessageDiv = styled.div`
   padding: 0.8rem;
   max-width: 500px;
   margin-top: 1rem;
   border-radius: 5px;
   position: relative;

   .message_sus_send {
      position: absolute;
      right: -10px;
      top: -10px;
   }

   .options_div {
      position: absolute;
      /* right: -50px; */
      top: 10px;
   }

   p {
      font-size: 14px;
      line-height: 26px;
   }
`;
