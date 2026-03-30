import styled, { css } from 'styled-components';

type HeadingProps = {
   as?: 'h1' | 'h2' | 'h3' | 'h4';
};

const Heading = styled.h1<HeadingProps>`
   ${(props) =>
      props.as === 'h1' &&
      css`
         font-size: clamp(2.2rem, 2.6vw, 3rem);
         font-weight: 600;
         /* background-color: yellow; */
      `}
   ${(props) =>
      props.as === 'h2' &&
      css`
         font-size: 2rem;
         font-weight: 600;
         /* background-color: green; */
      `}
   ${(props) =>
      props.as === 'h3' &&
      css`
         font-size: 2rem;
         font-weight: 500;
         /* background-color: red; */
      `}
   ${(props) =>
      props.as === 'h4' &&
      css`
         font-size: clamp(2.2rem, 2.6vw, 3rem);
         font-weight: 600;
         text-align: center;
      `}
      line-height:1.4;
`;

export default Heading;
