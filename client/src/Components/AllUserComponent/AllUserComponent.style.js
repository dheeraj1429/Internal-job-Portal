import styled from 'styled-components';

export const div = styled.div`
   table {
      width: 100%;

      tr {
         td {
            padding: 0.7rem;
         }

         th {
            font-weight: 400;
            font-size: 15px;
         }

         .user_images {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;

            img {
               width: 100%;
               height: 100%;
               object-fit: contain;
            }
         }
      }
   }
`;
