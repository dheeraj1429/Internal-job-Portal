import styled from "styled-components";

export const div = styled.div`
   padding: 2rem;

   .jodit-workplace + .jodit-status-bar:not(:empty) {
      display: none;
   }
   .jodit .jodit-workplace .jodit-wysiwyg,
   .jodit .jodit-workplace .jodit-wysiwyg_iframe,
   .jodit-container .jodit-workplace .jodit-wysiwyg,
   .jodit-container .jodit-workplace .jodit-wysiwyg_iframe {
      min-height: 400px !important;
   }

   @media (max-width: 500px) {
      h1 {
         font-size: 30px;
      }
      p {
         font-size: 12px;
         line-height: 24px;
      }
   }
`;
