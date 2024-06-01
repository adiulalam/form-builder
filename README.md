# Form Builder

A full-stack form builder that can be used for creating and sharing forms. The application also includes authentication, authorization, and a dashboard for comprehensive information visualization.

Created with Next.js, NextAuth, TRPC, MUI, and Tailwind.

## Installation
To use the application please make sure to clone the package, open terminal and then follow the instruction below.

### Setup the environment varibles, see `.env.example`

### Install the packages
```
npm i
```

### Running the tests
```
npm run test
```
### Running in DEV environment
```
npm run dev
```
### Running in PROD environment
```
npm start
```

## Additional Commands

### Running prisma studio
```bash
npx prisma studio
```

### Running migrate reset
```bash
npx prisma migrate reset
```

### Running db push
```bash
npx prisma db push
```

### Running migrate deploy
```bash
npx prisma migrate deploy
```

## Todo
- [ ] Finish off tests
- [ ] Add Docker container deployment
- [ ] Add seed file
- [ ] Finish off markdown 