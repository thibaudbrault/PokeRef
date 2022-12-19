import React from 'react';
import {
  FooterContainer,
  FooterInner,
  LeftFooter,
  CenterFooter,
  RightFooter,
} from './Styled.Footer';
import { FaGithub } from '@meronex/icons/fa';

function Footer() {
  return (
    <FooterContainer id="footer">
      <FooterInner>
        <LeftFooter>Created by Thibaud Brault</LeftFooter>
        <CenterFooter>PokéRef</CenterFooter>
        <RightFooter>
          <a
            href="https://github.com/thibaudbrault/PokeRef"
            aria-label="Github"
            target="_blank"
          >
            <FaGithub />
          </a>
        </RightFooter>
      </FooterInner>
    </FooterContainer>
  );
}

export default Footer;
