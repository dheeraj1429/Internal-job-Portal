import styled from "styled-components";

export const div = styled.div`
   background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/images/chat-bg.jpg);
   background-position: center;
   background-size: contain;
   width: 100%;
   height: 100%;
   overflow: hidden;
   padding-bottom: 1rem;

   .olderMessage_div {
      padding: 0.2rem;
      border-radius: 5px;
      cursor: pointer;

      p {
         font-size: 10px;
         color: var(--main-cl);
      }
   }

   .chatBox {
      padding-top: 1rem;
      position: relative;
      height: 92%;
      overflow-x: hidden;
      padding-bottom: 2rem;
      overflow-y: hidden;

      .scroll {
         width: 100%;
         height: 100%;
      }
   }

   @media (max-width: 1000px) {
      .chatBox {
         height: 89%;
      }
   }
`;
