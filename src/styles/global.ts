import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f0f2f5;
    --green: #33cc95;
    --red: #e52e4d;
    --blue: #5429cc;
    --blue-light: #6933ff;
    --text-title: #363f5f;
    --text-body: #969cb3;
    --shape: #fff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // determina o tamanho global de 1rem
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // font-size: 15px === 1rem
    }

    @media (max-width: 720px) {
      font-size: 87.5%; // font-size: 14px === 1rem
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h5, h5, h6 {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 575px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    border-radius: .25rem;
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
  }
`;