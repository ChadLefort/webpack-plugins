const { execSync } = require('child_process');

class TypescriptDeclarationPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const plugin = 'TypescriptDeclarationPlugin';

    compiler.hooks.afterEmit.tap(plugin, () => {
      if (this.options.packagePath && this.options.outputPath) {
        const { packagePath, outputPath } = this.options;

        try {
          execSync(
            `tsc ${packagePath}/src/index.js --outDir ${outputPath}/typings --declaration --declarationMap --allowJs --emitDeclarationOnly --skipLibCheck --experimentalDecorators --jsx react`,
            { stdio: 'inherit' }
          );
        } catch (error) {
          console.log(
            'Failed to generate Typescript defintions. Make you have typescript installed.'
          );
        }
      }
    });
  }
}

module.exports = TypescriptDeclarationPlugin;
