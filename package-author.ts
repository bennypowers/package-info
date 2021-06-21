import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Displays a package's author
 * @cssprop --software-license-link-color - link color
 */
@customElement('package-author')
export class PackageAuthor extends LitElement {
  static readonly is = 'package-author';

  static readonly styles = css`
    :host {
      display: inline-flex;
      gap: 4px;
    }

    a {
      color: var(--software-license-link-color, currentColor);
    }
  `;

  @property({ reflect: true }) name: string;

  @property({ reflect: true }) email: string;

  @property({ reflect: true }) url: string;

  render(): TemplateResult {
    return html`
    ${this.url ? html`
      <a href="${this.url}">${this.name}</a>
    ` : html`
      <span>${this.name}</span>
    `}
     ${!this.email ? '' : html`
      <a href="mailto:${this.email}" title="email">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>
      </a>
    `}
    `;
  }
}
