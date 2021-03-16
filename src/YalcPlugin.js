const { execSync } = require('child_process');

class YalcPlugin {
  apply(compiler) {
    const plugin = 'YalcPlugin';

    compiler.hooks.afterEmit.tap(plugin, () => {
      try {
        execSync('yalc publish --push', { stdio: 'inherit' });
      } catch (error) {
        console.log(
          'Failed to push new package. Make sure you have yalc install.'
        );
      }
    });
  }
}

module.exports = YalcPlugin;
