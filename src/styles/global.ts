import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root {
  --background: #f0f2f5;
  --shape: #ffffff;

  --red: #E62E4D;
  --blue: #5429CC;
  --blue-light: #6933ff;
  --green: #33CC95;

  --text-title: #363F5F;
  --text-body: #969CB3;
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // padrão de fonte: 16px (desktop): 1rem
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px quando a tela < 1080
    }

    @media (max-width: 720px) {
      font-size: 87.5%; // 14px quando a tela < 720
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

h1, h2, h3, h4, h5, h6, strong {
  font-weight: 600;
}

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
