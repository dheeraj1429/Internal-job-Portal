import styled from 'styled-components';

export const div = styled.div`
   h1 {
      font-size: 50px;
      margin-bottom: 0.8rem;
   }

   .jodit-workplace + .jodit-status-bar:not(:empty) {
      display: none;
   }
   .jodit .jodit-workplace .jodit-wysiwyg,
   .jodit .jodit-workplace .jodit-wysiwyg_iframe,
   .jodit-container .jodit-workplace .jodit-wysiwyg,
   .jodit-container .jodit-workplace .jodit-wysiwyg_iframe {
      min-height: 400px !important;
   }
`;
