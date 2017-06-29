import ManifestInspector from "./ManifestInspector";
import MultiManifestInspector from "./MultiManifestInspector";

const factory = path => new ManifestInspector(path);

factory.multi = (client, server) => new MultiManifestInspector(client, server);

module.exports = factory;
