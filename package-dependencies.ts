import type { Package } from './package-info';
import type { PropertyValues, TemplateResult } from 'lit';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import './package-info.js';
import 'zero-md/dist/zero-md.min.js';

/**
 * Display the dependencies of a package in HTML
 *
 * ```html
 * <package-dependencies src="dependencies.json"></package-dependencies>
 * ```
 *
 * ```html
 * <package-dependencies>
 *   <script type="application/json" src="dependencies.json"></script>
 * </package-dependencies>
 * ```
 *
 * @csspart info - the element for a specific dependency
 */
@customElement('package-dependencies')
export class PackageDependencies extends LitElement {
  static readonly is = 'package-dependencies';

  static readonly styles = css`
    :host {
      display: flex;
      flex-flow: column;
      gap: 6px;
    }
  `;

  /**
   * URL to the dependencies JSON file
   */
  @property({ type: String, reflect: true }) src = '';

  @state() private dependencies: Package[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.fetch();
  }

  updated(changed: PropertyValues<this>): void {
    if (changed.has('src') && this.src)
      this.fetch(this.src);
  }

  render(): TemplateResult[] {
    return this.dependencies.map(x => html`
      <package-info collapsible
        part="info"
        name="${x.name}"
        version="${x.version}"
        license="${x.license}"
        .author="${x.author}"
        .contributors="${x.contributors}"
        .description="${x.description}"
        .homepage="${x.homepage}"
        .licenseText="${x.licenseText}"
        .maintainers="${x.maintainers}"
        .private="${x.private}"
        .repository="${x.repository}"
      ></package-info>
    `);
  }

  private async fetch(
    src = this.querySelector<HTMLScriptElement>('script[type="application/json"]')?.src
  ): Promise<void> {
    const dependencies = await fetch(src)
      .then(r => {
        if (!r.ok)
          throw new Error(r.statusText);
        else
          return r;
      })
      .then<Package[]>(x => x.json())
      .then(xs => xs.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
      .catch(error => {
        console.error(error);
        return [];
      });

    if (dependencies)
      this.dependencies = dependencies;
  }
}
