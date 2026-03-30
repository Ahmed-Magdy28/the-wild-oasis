import styled, { css } from 'styled-components';

type RowType = {
   $type?: 'horizontal' | 'vertical';
};

const Row = styled.div<RowType>`
   display: flex;
   ${({ $type = 'vertical' }) =>
      $type === 'horizontal'
         ? css`
              justify-content: space-between;
              align-items: center;
              gap: 1.6rem;

              @media (max-width: 900px) {
                 flex-direction: column;
                 align-items: flex-start;
              }
           `
         : css`
              flex-direction: column;
              gap: 1.6rem;
           `}
`;

export default Row;
