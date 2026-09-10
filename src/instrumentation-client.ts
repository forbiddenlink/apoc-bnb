import * as Sentry from "@sentry/nextjs";

// Next 15+ loads this file on the client. The SDK only injects the legacy
// sentry.client.config.ts through a webpack entry, so under Turbopack (this
// app's bundler) that file was never bundled and client errors went nowhere.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production",
  tracesSampleRate: 0.1,
  beforeSend(event) {
    if (event.request?.headers) {
      delete event.request.headers["cookie"];
      delete event.request.headers["authorization"];
    }
    return event;
  },
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
