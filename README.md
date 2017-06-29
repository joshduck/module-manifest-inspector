# Module Manifest Inspector

Use this module to dynamically determine where code has been bundled.

This helper consumes the output of `webpack-module-manifest-plugin`.

## Usage

Generate manifests from server *and* client `webpack.config.js` configuration
using the Webpack plugin.

```javascript
const ManifestPlugin = require("webpack-module-manifest-plugin");

module.exports = {
  entry: "./src/client.js",
  plugins: [
    new ManifestPlugin({
      filename: "./build/client.manifest.json"
    })
  ]
}
```

Consume the manifest at runtime from the server bundle.

```javascript
import manifestInspector from "module-manifest-inspector";

const manifest = manifestInspector.multi(
  JSON.parse(fs.readFileSync("build/client.manifest.json")),
  JSON.parse(fs.readFileSync("build/server.manifest.json"))
);

// Get webpack ID for module 'a' in the server bundle.
const id = require.resolveWeak('./components/a');
const bundle = manifest.getClientBundleForServerId(id);
console.log(`Client code for "a" is provided by ${bundle}.`);
```
