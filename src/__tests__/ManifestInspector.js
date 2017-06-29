import ManifestInspector from "../ManifestInspector";
import clientManifest from "./client";

it("Accepts a valid manifest", () => {
  expect(() => new ManifestInspector({})).not.toThrow();
  expect(() => new ManifestInspector(clientManifest)).not.toThrow();
});

it("Throws if manifest is missing", () => {
  expect(() => new ManifestInspector()).toThrow();
});

it("Throws if manifest is invalid", () => {
  expect(() => new ManifestInspector({ input: false })).toThrow();
});

it("Returns bundle information", () => {
  const inspector = new ManifestInspector(clientManifest);
  expect(inspector.getBundleForId(0)).toBe("client.js");
  expect(inspector.getBundleForSource("./src/a.js")).toBe("client.js");
});

it("Returns source information", () => {
  const inspector = new ManifestInspector(clientManifest);
  expect(inspector.getSourceForId(0)).toBe("./src/a.js");
});

it("Returns undefined for missing modules", () => {
  const inspector = new ManifestInspector(clientManifest);
  expect(inspector.getBundleForId(100)).toBe(undefined);
  expect(inspector.getBundleForSource("./src/nothing.js")).toBe(undefined);
});
