# GitHub Repositories Explorer

This project is a small Next.js application that allows searching for GitHub users and exploring their repositories. It demonstrates both client side and server side rendering.

## Demo URL

https://github-repositories-explorer-tau.vercel.app

## Features

- Search for up to five GitHub users by name.
- Expand a user to list all their repositories with description and star count.
- Responsive design using Tailwind CSS.
- Search state is handled via React context.
- Two pages:
  - **/csr** – fully client side rendering.
  - **/ssr** – initial results are rendered on the server.
- Loading and error states for better UX.
- Unit and integration tests.

## Development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Tests

Run tests with:

```bash
npm test
```

## Building

```bash
npm run build
```

## License

MIT
