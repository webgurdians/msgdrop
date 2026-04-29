import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function createGoogleAnalyticsTags(measurementId: string) {
  const escapedMeasurementId = escapeHtml(measurementId)
  const serializedMeasurementId = JSON.stringify(measurementId)

  return [
    `<script async id="google-analytics" src="https://www.googletagmanager.com/gtag/js?id=${escapedMeasurementId}"></script>`,
    `<script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ${serializedMeasurementId}, { send_page_view: false });
    </script>`,
  ].join('\n    ')
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const googleAnalyticsId = env.VITE_GA_MEASUREMENT_ID?.trim()
  const googleSiteVerification = env.VITE_GOOGLE_SITE_VERIFICATION?.trim()

  return {
    plugins: [
      {
        name: 'msgdrop-html-meta',
        transformIndexHtml(html) {
          const headTags = [
            googleSiteVerification
              ? `<meta name="google-site-verification" content="${escapeHtml(googleSiteVerification)}" />`
              : '',
            googleAnalyticsId ? createGoogleAnalyticsTags(googleAnalyticsId) : '',
          ].filter(Boolean)

          if (!headTags.length) {
            return html
          }

          return html.replace(
            '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
            `<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    ${headTags.join('\n    ')}`,
          )
        },
      },
      react(),
      tailwindcss(),
    ],
  }
})
