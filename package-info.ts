import { customElement, LitElement, property, TemplateResult, html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

import style from './package-info.css';

import './package-author';

import LICENSES from './licenses';

export interface AuthorDescriptor {
  name: string;
  email?: string;
  url?: string;
}

export interface RepositoryDescriptor {
  type: string;
  url: string;
  directory?: string;
}

export type Author = string | AuthorDescriptor;

export type Repository = string | RepositoryDescriptor

export interface Package {
  name: string;
  version: string;
  license: string;
  repository: Repository;
  author: Author;
  description?: string;
  homepage?: string;
  maintainers?: Author[];
  contributors?: Author[];
  private?: false;
  licenseText?: string;
}

function isRepositoryDescriptor(repository: Repository): repository is RepositoryDescriptor {
  return repository && typeof repository !== 'string';
}

function parseRepositoryString(repository: string): RepositoryDescriptor {
  const r = repository ?? ''
  const matches = r.match(/([\w\-]+)\/([\w\-]+)/)
  const type = repository && 'git';
  const url = matches ? `git+https://github.com/${matches[1]}/${matches[2]}` : r;
  return { type, url }
}

function parseRepository(repository: Repository): RepositoryDescriptor {
  if (isRepositoryDescriptor(repository)) return repository;
  else return parseRepositoryString(repository);
}

function urlForRepository(repository: Repository): string {
  const { url = '', type = '', directory = '' } = parseRepository(repository);
  const dir = directory ? `/tree/master/${directory}` : '';
  return `${url}${dir}`;
}

function ensureAuthor(author: Author): AuthorDescriptor {
  return typeof author === 'string' ? { name: author } : author;
}

/**
 * Displays a software package and it's license.
 *
 * Well suited for use with [`rollup-plugin-license`](https://npm.im/rollup-plugin-license)
 *
 * @slot author - Software Author. `<package-author>` element preferred
 * @slot description - Package description. takes a `<p>` element
 * @slot maintainer - Software maintainers. takes a `<package-author>` element or `<ol>` of such
 * @slot contributor - Software contributors. takes a `<package-author>` element of `<ol>` of such
 * @slot license - License. e.g. `<pre>` or formatted license HTML
 * @csspart details - main details widget
 * @csspart summary - main details summary widget
 * @csspart name - package name
 * @csspart license-badge - license ID badge
 * @csspart description - package description
 * @csspart properties - `<DL>` of license properties
 * @csspart license-text - default `license` slot content (`<pre>`)
 */
@customElement('package-info')
export class PackageInfo extends LitElement {
  static readonly is = 'package-info';

  static readonly styles = style;

  /** When true, only the name is initially shown */
  @property({ type: Boolean, reflect: true }) collapsible = false;

  /** Package Name */
  @property({ reflect: true }) name: string;

  /** Package Version */
  @property({ reflect: true }) version: string;

  /** Package Description */
  @property() description: string;

  /** Package Homepage */
  @property() homepage: string;

  /** SPDX License Name */
  @property() license: string;

  /** License Text. Maybe also be slotted into `license` slot */
  @property({ attribute: false }) licenseText: string;

  /** Package Contributors */
  @property({ attribute: false }) contributors: Author[];

  /** Package Maintainers */
  @property({ attribute: false }) maintainers: Author[];

  /** Package Author */
  @property() author: Author;

  /** Package Repository */
  @property() repository: Repository;

  render(): TemplateResult {
    const {
      author,
      contributors,
      description,
      homepage,
      license,
      licenseText,
      maintainers,
      name,
      repository,
    } = this;

    const _contributors =
      Array.isArray(contributors) ? contributors : [];

    const _maintainers =
      Array.isArray(maintainers) ? maintainers : [];

    const hasMaintainers =
      !!_maintainers.length ||
      !!this.querySelectorAll('[slot="maintainer"]').length

    const hasContributors =
      !!_contributors.length ||
      !!this.querySelectorAll('[slot="contributor"]').length

    const hasAuthor =
      !!this.author ||
      !!this.querySelector('[slot="author"]')

    const hasRepository =
      !!this.repository

    const hasLicenseText =
      !!this.licenseText ||
      !!this.querySelector('[slot="license"]')

    const repoUrl =
      urlForRepository(repository);

    const repoHref = repoUrl
      .replace('git+http', 'http')
      .replace('git+ssh://git@', 'https://')
      .replace('.git', '/');

    const homepageHref =
      homepage && `https://${homepage.replace(/https?\:\/\//, '')}`;

    const licenseHref =
      `https://spdx.org/licenses/${license}.html`;

    return html`
      <details part="details">
        <summary part="summary">
          <h2 part="name">${name}</h2>
          ${!license ? '': LICENSES.includes(license) ? html`
          <a href="${licenseHref}" rel="noopener noreferrer" target="_blank" part="license-badge">
            ${license}
          </a>
          ` : html`
          <span part="license-badge">${license}</span>
          `}
        </summary>

        <slot name="description">
          <p ?hidden="${!description}">${description}</p>
        </slot>

        <dl part="properties">

          <dt ?hidden="${!homepage}">Homepage</dt>
          <dd ?hidden="${!homepage}">
            <a href="${homepageHref}" rel="noopener noreferrer" target="_blank">${homepage}</a>
          </dd>

          <dt ?hidden="${!hasRepository}">Repository</dt>
          <dd ?hidden="${!hasRepository}">
            <a href="${repoHref}">${repoUrl}</a>
          </dd>

          <dt ?hidden="${!hasAuthor}">Author</dt>
          <dd ?hidden="${!hasAuthor}">
            <slot name="author" @slotchange="${() => this.requestUpdate()}">
              <package-author ...="${spread(ensureAuthor(author))}"></package-author>
            </slot>
          </dd>

          <dt ?hidden="${!hasMaintainers}">Maintainers</dt>
          <dd ?hidden="${!hasMaintainers}">
            <slot name="maintainer" @slotchange="${() => this.requestUpdate()}">
              <ol>
                ${!_maintainers.length ? '' : _maintainers.map(x => html`
                <li>
                  <package-author ...="${spread(ensureAuthor(author))}"></package-author>
                </li>
                `)}
              </ol>
            </slot>
          </dd>

          <dt ?hidden="${!hasContributors}">Contributors</dt>
          <dd ?hidden="${!hasContributors}">
            <slot name="contributor" @slotchange="${() => this.requestUpdate()}">
              <ol>
                ${!_contributors.length ? '' : _contributors.map(x => html`
                <li>
                  <package-author ...="${spread(ensureAuthor(author))}"></package-author>
                </li>
                `)}
              </ol>
            </slot>
          </dd>

          <dt ?hidden="${!license}">License</dt>
          <dd ?hidden="${!license}">
            <a href="${licenseHref}" rel="noopener noreferrer" target="_blank">
              ${license}
            </a>
          </dd>
        </dl>

        <details ?hidden="${!hasLicenseText}">
          <summary>View License Text</summary>
          <slot name="license"><pre part="license-text">${licenseText}</pre></slot>
        </details>
      </details>
    `
  }
}