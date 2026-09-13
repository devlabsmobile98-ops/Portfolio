import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// The portfolio is a public, frontend-only site. Base44 is still supported when
// the normal Base44 environment variables are present, but local development
// should not require a Base44 login just to view the portfolio.
export const base44 = appId
  ? createClient({
      appId,
      token,
      functionsVersion,
      serverUrl: '',
      appBaseUrl,
    })
  : {
      app: {
        getPublicSettings: async () => ({}),
      },
      auth: {
        me: async () => {
          const error = new Error('Base44 authentication is not configured for local standalone mode.');
          error.status = 401;
          throw error;
        },
        logout: () => {},
        redirectToLogin: () => {},
      },
    };
