type GtagCommand = 'config' | 'event' | 'js'

interface MetaPixelFunction {
  (command: 'init', pixelId: string): void
  (command: 'track', eventName: string): void
  (command: 'trackCustom', eventName: string, params?: Record<string, unknown>): void
  callMethod?: (...args: unknown[]) => void
  loaded?: boolean
  queue?: unknown[]
  push?: MetaPixelFunction
  version?: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void
    fbq?: MetaPixelFunction
    _fbq?: MetaPixelFunction
  }
}

const googleAnalyticsId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()
const metaPixelId = import.meta.env.VITE_META_PIXEL_ID?.trim()

let isInitialized = false
let lastTrackedPath = ''

function appendScript(id: string, src: string) {
  if (document.getElementById(id)) {
    return
  }

  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function initializeGoogleAnalytics() {
  if (!googleAnalyticsId) {
    return
  }

  window.dataLayer = window.dataLayer ?? []

  if (!window.gtag) {
    window.gtag = function gtag(...args) {
      window.dataLayer?.push(args)
    }

    window.gtag('js', new Date())
    window.gtag('config', googleAnalyticsId, {
      send_page_view: false,
    })
  }

  appendScript('google-analytics', `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`)
}

function initializeMetaPixel() {
  if (!metaPixelId || window.fbq) {
    return
  }

  let fbq: MetaPixelFunction
  fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args)
      return
    }

    fbq.queue?.push(args)
  }) as MetaPixelFunction

  window.fbq = fbq
  window._fbq = fbq
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []

  appendScript('meta-pixel', 'https://connect.facebook.net/en_US/fbevents.js')
  fbq('init', metaPixelId)
}

export function initializeAnalytics() {
  if (isInitialized || typeof window === 'undefined') {
    return
  }

  initializeGoogleAnalytics()
  initializeMetaPixel()
  isInitialized = true
}

export function trackPageView(path: string) {
  if (path === lastTrackedPath) {
    return
  }

  lastTrackedPath = path

  if (googleAnalyticsId && window.gtag) {
    window.gtag('config', googleAnalyticsId, {
      page_path: path,
    })
  }

  if (metaPixelId && window.fbq) {
    window.fbq('track', 'PageView')
  }
}
