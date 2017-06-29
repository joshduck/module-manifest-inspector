import MultiManifestInspector from "../MultiManifestInspector";
import clientManifest from "./client";
import serverManifest from "./server";

it("Accepts a valid manifest", () => {
  expect(() => new MultiManifestInspector({}, {})).not.toThrow();
  expect(
    () => new MultiManifestInspector(clientManifest, serverManifest)
  ).not.toThrow();
});

it("Throws if manifest is missing", () => {
  expect(() => new MultiManifestInspector()).toThrow();
});

it("Throws if manifest is invalid", () => {
  expect(() => new MultiManifestInspector({ a: 0 }, { b: 1 })).toThrow();
});

it("Returns bundle information", () => {
  const inspector = new MultiManifestInspector(clientManifest, serverManifest);
  expect(inspector.getClientBundleForServerId(0)).toBe("client.js");
});

it("Returns undefined for missing modules", () => {
  const inspector = new MultiManifestInspector(clientManifest, serverManifest);
  expect(inspector.getClientBundleForServerId(100)).toBe(undefined);
  expect(inspector.getClientBundleForServerId(5)).toBe(undefined);
});
