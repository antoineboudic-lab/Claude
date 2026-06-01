import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://f39011a96da924f7599386af077e10de@o4511490857041920.ingest.us.sentry.io/4511490859270144',
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
