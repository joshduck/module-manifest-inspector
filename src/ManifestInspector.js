import fs from "fs";

const validate = manifest => {
  if (typeof manifest !== "object") {
    throw new Error("ManifestInspector: input must be an object");
  }

  Object.keys(manifest).forEach(key => {
    if (!Array.isArray(manifest[key])) {
      throw new Error("ManifestInspector: input is invalid");
    }
  });
};

export default class ManifestInspector {
  constructor(manifest) {
    validate(manifest);

    this.idToSource = {};
    this.idToBundle = {};
    this.sourceToBundle = {};

    Object.keys(manifest).forEach(bundle => {
      manifest[bundle].map(module => {
        this.idToSource[module.id] = module.name;
        this.idToBundle[module.id] = bundle;
        this.sourceToBundle[module.name] = bundle;
      });
    });
  }

  getSourceForId(id) {
    return this.idToSource[id];
  }

  getBundleForSource(source) {
    return this.sourceToBundle[source];
  }

  getBundleForId(id) {
    return this.idToBundle[id];
  }
}
