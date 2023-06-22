import { FaGithub } from '@meronex/icons/fa';
import {
  CenterFooter,
  FooterContainer,
  FooterInner,
  LeftFooter,
  RightFooter,
} from './Styled.Footer';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterContainer id="footer">
      <FooterInner>
        <LeftFooter>© {year} PokéRef</LeftFooter>
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
