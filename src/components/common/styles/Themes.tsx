import styled from 'styled-components';

export type Theme = {
  main: string;
  secondary: string;
  red: string;
  purple: string;
  background: string;
}

export const darkTheme: Theme = {
  main: `#161616`,
  secondary: `#c4c4c4`,
  red: `#cc0000`,
  purple: `#5e318f`,
  background: `url("https://www.transparenttextures.com/patterns/asfalt-dark.png")`,
};

export const lightTheme: Theme = {
  main: `#c4c4c4`,
  secondary: `#161616`,
  red: `#cc0000`,
  purple: `#5e318f`,
  background: `url("https://www.transparenttextures.com/patterns/asfalt-light.png")`,
};

export const Type = styled.div`
  &#normal {
    background-color: #969592;
  }

  &#fire {
    background-color: #db4249;
  }

  &#water {
    background-color: #55b8e2;
  }

  &#grass {
    background-color: #459f4d;
  }

  &#electric {
    background-color: #dbb508;
  }

  &#ice {
    background-color: #6db5ba;
  }

  &#fighting {
    background-color: #d77a49;
  }

  &#poison {
    background-color: #82549a;
  }

  &#ground {
    background-color: #9a5e41;
  }

  &#flying {
    background-color: #5983ef;
  }

  &#psychic {
    background-color: #e76e9a;
  }

  &#bug {
    background-color: #9eb559;
  }

  &#rock {
    background-color: #a28d79;
  }

  &#ghost {
    background-color: #a2729a;
  }

  &#dark {
    background-color: #555461;
  }

  &#dragon {
    background-color: #1085a2;
  }

  &#steel {
    background-color: #7d879a;
  }

  &#fairy {
    background-color: #ef9bb6;
  }
`;