import { FaGithub } from '@meronex/icons/fa';
import {
  CenterFooter,
  FooterContainer,
  FooterInner,
  LeftFooter,
  RightFooter,
} from './Styled.Footer';

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
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </RightFooter>
      </FooterInner>
    </FooterContainer>
  );
}

export default Footer;
