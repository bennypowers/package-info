export default ({
  exclude: ['*.d.ts', '*.js'],
  plugins: [
    { // TODO: publish this from apollo-elements
      name: 'ts-to-js-extension',
      packageLinkPhase({ customElementsManifest }){
        customElementsManifest?.modules?.forEach(mod => {
            mod.path = mod.path.replace('.ts', '.js')
            for (const ex of mod.exports ?? [])
              ex.declaration.module = ex.declaration.module?.replace?.('.ts', '.js')
            for (const dec of mod.declarations ?? []) {
              if (dec.kind === 'class') {
                for (const member of dec.members ?? []) {
                  if (member.inheritedFrom)
                    member.inheritedFrom.module = member.inheritedFrom.module?.replace?.('.ts', '.js')
                }
              }
            }
        });
      }
    }
  ]
});
