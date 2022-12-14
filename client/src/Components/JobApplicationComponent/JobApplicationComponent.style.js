import styled from 'styled-components';

export const div = styled.div`
   table {
      width: 100%;
      tr {
         padding: 0.4rem;

         .userProfileDiv {
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 50%;

            img {
               width: 100%;
               height: 100%;
               object-fit: contain;
            }
         }

         th {
            font-weight: 400;
            color: var(--spec-icon-disabled);
         }
      }
   }

   .four_zero_four_bg {
      background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
      height: 500px;
      background-position: center;
      background-repeat: no-repeat;
   }

   .four_zero_four_bg h1 {
      font-size: 50px;
   }

   .four_zero_four_bg h3 {
      font-size: 80px;
   }
`;