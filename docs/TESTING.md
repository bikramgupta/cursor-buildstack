# Testing

Run the full gate with:

```bash
npm test
npm run lint
```

`npm test` runs `astro check`, creates the production `dist/`, and then runs the Node acceptance tests in `test/site.test.mjs` against source and built HTML. The suite covers configuration, shared shell usage, page structure, accessibility, motion, self-hosted fonts, and removal of the placeholder scaffold.
