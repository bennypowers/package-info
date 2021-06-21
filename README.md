# `index.js`:
  
## Exports

| kind | name      | declaration | module | package |
|------|-----------|-------------|--------|---------|
|js |* |* |  | ./package-author |[object Object] | | |
|js |* |* |  | ./package-info |[object Object] | | |
# `licenses.js`:
  
## Exports

| kind | name      | declaration | module | package |
|------|-----------|-------------|--------|---------|
|js |default | | licenses.js |  |[object Object] | | |
# `package-author.js`:

## class: `PackageAuthor`, `package-author` 
  
  ### Superclass
  
  | name | module | package |
  |------|--------|---------|
  |LitElement | | |


### Fields

| name | type | privacy | default | description | inheritedFrom |
|------|------|---------|---------|-------------|---------------|
|is | | |package-author | | | |
|name |string | | | | | |
|email |string | | | | | |
|url |string | | | | | |


### Attributes

| name | fieldName | inheritedFrom |
|------|-----------|---------------|
|name |name | | |
|email |email | | |
|url |url | | |


### CSS Properties

| name | description |
|------|-----------|
|--software-license-link-color |- link color |


<hr></hr>
  
## Exports

| kind | name      | declaration | module | package |
|------|-----------|-------------|--------|---------|
|js |PackageAuthor |PackageAuthor | package-author.js |  |[object Object] | | |
|custom-element-definition |package-author |PackageAuthor | package-author.js |  |[object Object] | | |
# `package-dependencies.js`:

## class: `PackageDependencies`, `package-dependencies` 
  
  ### Superclass
  
  | name | module | package |
  |------|--------|---------|
  |LitElement | | |


### Fields

| name | type | privacy | default | description | inheritedFrom |
|------|------|---------|---------|-------------|---------------|
|is | | |package-dependencies | | | |
|src | | | |URL to the dependencies JSON file | | |
|dependencies |Package[] |private | | | | |


### Methods

| name | privacy | description | parameters | return | inheritedFrom |
|------|---------|-------------|------------|--------|---------------|
|fetch |private | |src  |Promise<void> | | |


### Attributes

| name | fieldName | inheritedFrom |
|------|-----------|---------------|
|src |src | | |


<hr></hr>
  
## Exports

| kind | name      | declaration | module | package |
|------|-----------|-------------|--------|---------|
|js |PackageDependencies |PackageDependencies | package-dependencies.js |  |[object Object] | | |
|custom-element-definition |package-dependencies |PackageDependencies | package-dependencies.js |  |[object Object] | | |
# `package-info.js`:

## class: `PackageInfo`, `package-info` 
  
  ### Superclass
  
  | name | module | package |
  |------|--------|---------|
  |LitElement | | |


### Fields

| name | type | privacy | default | description | inheritedFrom |
|------|------|---------|---------|-------------|---------------|
|is | | |package-info | | | |
|collapsible | | | |When true, only the name is initially shown | | |
|name |string | | |Package Name | | |
|version |string | | |Package Version | | |
|description |string | | |Package Description | | |
|homepage |string | | |Package Homepage | | |
|license |string | | |SPDX License Name | | |
|licenseText |string | | |License Text. Maybe also be slotted into `license` slot | | |
|contributors |Author[] | | |Package Contributors | | |
|maintainers |Author[] | | |Package Maintainers | | |
|author |Author | | |Package Author | | |
|repository |Repository | | |Package Repository | | |


### Attributes

| name | fieldName | inheritedFrom |
|------|-----------|---------------|
|collapsible |collapsible | | |
|name |name | | |
|version |version | | |
|description |description | | |
|homepage |homepage | | |
|license |license | | |
|author |author | | |
|repository |repository | | |


### Slots

| name | description |
|------|-----------|
|author |- Software Author. `<package-author>` element preferred |
|description |- Package description. takes a `<p>` element |
|maintainer |- Software maintainers. takes a `<package-author>` element or `<ol>` of such |
|contributor |- Software contributors. takes a `<package-author>` element of `<ol>` of such |
|license |- License. e.g. `<pre>` or formatted license HTML |


<hr></hr>
  
## Exports

| kind | name      | declaration | module | package |
|------|-----------|-------------|--------|---------|
|js |PackageInfo |PackageInfo | package-info.js |  |[object Object] | | |
|custom-element-definition |package-info |PackageInfo | package-info.js |  |[object Object] | | |
