import { FC } from 'react';
import { Global } from '@emotion/react';

interface FontsProps {}

const Fonts: FC<FontsProps> = () => {
  const fontFace = `
        @font-face {
          font-family: 'iransans';
          src: url('./fonts/iransans.ttf') format('ttf');
        }
        `;

  return <Global styles={fontFace} />;
};

export default Fonts;
