import styled from "styled-components";

export const div = styled.div`
  h1 {
    font-size: 40px;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 1000px) {
    h1 {
      font-size: 40px;
    }
    p {
      font-size: 15px;
    }
  }
  @media (max-width: 700px) {
    h1 {
      font-size: 30px;
    }
    p {
      font-size: 12px;
      line-height: 24px;
    }
  }
  @media (max-width: 400px) {
    h1 {
      font-size: 20px;
    }
  }
`;
