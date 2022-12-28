import styled from "styled-components";

export const div = styled.div`
   .admin-signin {
      width: 100%;
      padding: 1rem;
      border-radius: 12px;
      background-color: var(--google-button-cl);
      color: var(--main-cl);
      margin-top: 1rem;
      transition: all 0.3s ease;
   }
   .admin-signin:hover {
      background-color: var(--spec-base-background);
   }
   .category_upload {
      background-color: var(--dark-blue-cl);
      padding: 0.3rem 3rem;
      border-radius: 5px;
      color: var(--main-cl);
      transition: all 0.4s ease;
      margin-top: 1rem;
   }
   .category_upload:hover {
      background-color: var(--spec-call-to-action-inverse);
   }
   .Delete_btn {
      padding: 0.3rem 3rem;
      margin-top: 1rem;
      margin-left: 1rem;
      background-color: var(--button-cl);
      color: var(--main-cl);
      border-radius: 5px;
      transition: all 0.4s ease;
      border: 1px solid transparent;
   }
   .Delete_btn:hover {
      background-color: var(--spec-static-brand-red);
      color: var(--dark-cl) !important;
      border: 1px solid var(--dark-cl);
   }
   .clear_btn {
      padding: 0.3rem 3rem;
      margin-top: 1rem;
      margin-left: 1rem;
      background-color: var(--google-button-cl);
      color: var(--main-cl);
      border-radius: 5px;
      transition: all 0.4s ease;
   }
   .table_btn {
      background-color: transparent;
      margin-right: 1rem;
      svg {
         font-size: 17px;
      }
   }
   .pagination_btn {
      padding: 0.1rem 0.7rem;
      border-radius: 5px;
      margin: 0 0.5rem;
      transition: all 0.3s ease;
      svg {
         margin: 0;
      }
   }
   .PrevDisable_btn {
      padding: 0.1rem 0.7rem;
      border-radius: 5px;
      margin: 0 0.5rem;
      background-color: var(--spec-10-percent-layer);
      transition: all 0.3s ease;
      cursor: not-allowed;
      svg {
         fill: var(--main-cl);
      }
   }
   img {
      width: auto;
      height: 30px;
   }
   .margin-0 {
      padding: 0.5rem 3rem;
      margin: 0 !important;
   }
   .margin-rigth {
      padding: 0.5rem 3rem;
      margin: 0 !important;
      margin-right: 0.5rem !important;
   }
   .Discover_btn {
      background-color: transparent;
      padding: 0.7rem 2rem;
      border: 2px solid var(--main-cl);
      color: var(--main-cl);
      transition: all 0.4s ease;
      margin-top: 1rem;
   }
   .Discover_btn:hover {
      background-color: var(--spec-general-background-a);
      color: var(--main-cl);
   }
   .see_more {
      background-color: transparent;
      padding: 0.5rem 3rem;
      border: 2px solid var(--spec-icon-disabled);
      color: var(--spec-general-background-a);
      transition: all 0.3s ease;
   }
   .see_more:hover {
      background-color: var(--dark-cl);
      color: var(--main-cl);
      border: 2px solid transparent;
   }
   .addToCart {
      padding: 0.5rem 3rem;
      background-color: var(--dark-cl);
      color: var(--main-cl);
      transition: all 0.3s ease;
   }
   .addToCart:hover {
      background-color: var(--spec-suggested-action);
      box-shadow: 0 0 10px 1px #e1e1e1;
   }
   .addToCart_2 {
      padding: 0.3rem 3rem;
      background-color: var(--dark-cl);
      color: var(--main-cl);
      transition: all 0.3s ease;
   }
   .addToCart_wide {
      width: 100%;
      margin: 1rem 0;
   }
   .subscribe {
      padding: 0 3rem;
      height: 50px;
      background-color: var(--spec-ad-indicator);
      color: var(--main-cl);
      transition: all 0.2s ease;
   }
   .subscribe:hover {
      background-color: var(--dark-cl);
   }
   .checkout {
      width: 100%;
      padding: 0.8rem;
      background-color: var(--timer-bg-cl);
      color: var(--main-cl);
   }
   .shipping_button {
      padding: 0.7rem 1.5rem;
      color: var(--main-cl);
      background-color: var(--spec-call-to-action-inverse);
      border-radius: 5px;
   }
   .editButton {
      padding: 0.3rem 1px;
      border-radius: 5px;
      background-color: var(--spec-brand-background-solid);

      p {
         display: flex;
         align-items: center;
         justify-content: center;
         color: var(--main-cl);
      }
   }
`;

export const button = styled.button`
   border: none;
   outline: none;
   cursor: pointer;
`;
