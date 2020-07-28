import { css } from 'lit-element';
export default css`
:host {
  display: inline-flex;
  gap: 4px;
}

a {
  color: var(--software-license-link-color, currentColor);
}
`;