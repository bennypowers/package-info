import { css } from 'lit-element';
export default css`
:host {
  display: block;
  list-style: unset;
  padding-left: 2rem;
}

[part="summary"] {
  display: flex;
  align-items: center;
  margin-left: -2rem;
}

h2 {
  margin: 0;
}

a {
  color: var(--software-license-link-color, currentColor);
}

dl {
  display: grid;
  grid-template-columns: min-content 1fr;
}

dd {
  overflow: hidden;
  text-overflow: ellipsis;
}


dl ol,
dl ::slotted(ol) {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

pre,
article ::slotted(pre) {
  white-space: pre-wrap;
}

summary [part="license-badge"] {
  border-radius: 12px;
  text-decoration: none;
  font-size: 11px;
  border: 1px solid var(--license-badge-border-color, #9e9e9e /* Grey 500 */);
  background-color: var(--license-badge-background-color, #eeeeee /* Grey 200 */);
  padding: 4px 6px;
  margin-left: auto;
}

@media(prefers-color-scheme: dark) {
  summary [part="license-badge"] {
    border: 1px solid var(--license-badge-border-color, #616161 /* Grey 700 */);
    background-color: var(--license-badge-background-color, #212121 /* Grey 900 */);
  }
}
`;