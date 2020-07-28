# package-author

## Properties

| Property | Attribute | Type     |
|----------|-----------|----------|
| `email`  | `email`   | `string` |
| `name`   | `name`    | `string` |
| `url`    | `url`     | `string` |


# package-info

Displays a software package and it's license.

Well suited for use with [`rollup-plugin-license`](https://npm.im/rollup-plugin-license)

## Properties

| Property       | Attribute     | Type         | Default | Description                                      |
|----------------|---------------|--------------|---------|--------------------------------------------------|
| `author`       | `author`      | `Author`     |         | Package Author                                   |
| `collapsible`  | `collapsible` | `boolean`    | false   | When true, only the name is initially shown      |
| `contributors` |               | `Author[]`   |         | Package Contributors                             |
| `description`  | `description` | `string`     |         | Package Description                              |
| `homepage`     | `homepage`    | `string`     |         | Package Homepage                                 |
| `license`      | `license`     | `string`     |         | SPDX License Name                                |
| `licenseText`  |               | `string`     |         | License Text. Maybe also be slotted into `license` slot |
| `maintainers`  |               | `Author[]`   |         | Package Maintainers                              |
| `name`         | `name`        | `string`     |         | Package Name                                     |
| `repository`   | `repository`  | `Repository` |         | Package Repository                               |
| `version`      | `version`     | `string`     |         | Package Version                                  |

## Slots

| Name          | Description                                      |
|---------------|--------------------------------------------------|
| `author`      | Software Author. `<package-author>` element preferred |
| `contributor` | Software contributors. takes a `<package-author>` element of `<ol>` of such |
| `description` | Package description. takes a `<p>` element       |
| `license`     | License. e.g. `<pre>` or formatted license HTML  |
| `maintainer`  | Software maintainers. takes a `<package-author>` element or `<ol>` of such |

## CSS Shadow Parts

| Part            | Description                              |
|-----------------|------------------------------------------|
| `description`   | package description                      |
| `details`       | main details widget                      |
| `license-badge` | license ID badge                         |
| `license-text`  | default `license` slot content (`<pre>`) |
| `name`          | package name                             |
| `properties`    | `<DL>` of license properties             |
| `summary`       | main details summary widget              |
