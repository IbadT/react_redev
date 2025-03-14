import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://670baaf13d4a4b4293ed428bedbc21f9@o4504702503682048.ingest.us.sentry.io/4505048651923456",
  integrations: [
  ],
  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],
});
