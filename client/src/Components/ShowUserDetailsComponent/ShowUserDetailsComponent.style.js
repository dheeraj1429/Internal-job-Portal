import styled from "styled-components";

export const div = styled.div`
   .user_profile_bg_div {
      width: 100%;
      height: 300px;
      background-image: url(https://images.unsplash.com/photo-1670968982569-722c875727dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80);
      background-position: center;
      background-size: cover;
      position: relative;
   }

   .pr_div {
      .hover_div {
         padding: 0.2rem;
         border-radius: 5px;
         text-align: center;
         width: max-content;
         position: absolute;
         top: -40px;
         visibility: hidden;
         opacity: 0;
         transition: all 0.1s ease;

         p {
            font-size: 10px;
         }
      }

      &:hover {
         .hover_div {
            top: -28px;
            visibility: visible;
            opacity: 1;
         }
      }
   }
`;
