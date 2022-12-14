import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   padding: 0.8rem 1.2rem;

   .user_profile_div {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   .user_content_info_div {
      p {
         font-size: 12px;
      }
   }
`;
