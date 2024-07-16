// Mocks any CSS module imports, ensuring that components can still reference the
// styles. Allows tests to verify that the correct class names are applied, without
// needing to load the actual CSS files.
export default new Proxy({}, {
  get: (target, prop) => prop,
});
