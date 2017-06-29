import ManifestInspector from "./ManifestInspector";

export default class MultiManifestInspector {
  constructor(client, server) {
    this.clientManifest = new ManifestInspector(client);
    this.serverManifest = new ManifestInspector(server);
  }

  getClientBundleForServerId(id) {
    const source = this.serverManifest.getSourceForId(id);
    return this.clientManifest.getBundleForSource(source);
  }
}
