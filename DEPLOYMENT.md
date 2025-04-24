# Micro-Ritual Designer - Deployment Guide

This document provides instructions for deploying the Micro-Ritual Designer application.

## Local Development

To run the application locally:

1. Clone the repository
2. Install dependencies:
   ```
   cd micro-ritual-designer
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to http://localhost:3000

## Building for Production

To build the application for production:

```
npm run build
```

This will create an optimized production build in the `.next` directory.

## Deployment Options

### Option 1: Vercel (Recommended)

The easiest way to deploy this Next.js application is using Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project into Vercel
3. Vercel will automatically detect the Next.js configuration and deploy your application

### Option 2: Static Export

For static hosting environments:

1. Build the application:
   ```
   npm run build
   ```
2. Export to static HTML:
   ```
   npm run export
   ```
3. The static files will be generated in the `out` directory
4. Deploy these files to any static hosting service (Netlify, GitHub Pages, etc.)

### Option 3: Self-Hosted

To deploy on your own server:

1. Build the application:
   ```
   npm run build
   ```
2. Start the production server:
   ```
   npm start
   ```

## Environment Variables

The application doesn't require any environment variables for basic functionality as it uses localStorage for data persistence. For a production application, you would want to configure:

- Database connection details
- Authentication services
- API keys for third-party services

## Future Enhancements

For a production-ready application, consider implementing:

1. User authentication system
2. Server-side database for data persistence
3. Push notification service
4. Mobile app versions using React Native
5. Analytics to track user engagement

## Support

For any issues or questions, please open an issue in the repository or contact the development team.
