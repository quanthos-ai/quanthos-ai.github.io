// Shared Meta Pixel + GA4 tracking. Every outbound conversion records the
// campaign parameters (UTM) captured on the visitor's first page view.

export function trackMetaEvent(eventName: string, parameters?: Record<string, unknown>) {
  window.fbq?.('track', eventName, parameters);
}

export function trackGoogleEvent(eventName: string, parameters?: Record<string, unknown>) {
  window.gtag?.('event', eventName, parameters);
}

export function getCampaignParameters() {
  const parameters = new URLSearchParams(window.location.search);
  const campaignParameters: Record<string, string> = {};

  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const value = parameters.get(key);
    if (value) campaignParameters[key] = value;
  }

  if (Object.keys(campaignParameters).length > 0) {
    window.sessionStorage.setItem('quanthos_campaign_parameters', JSON.stringify(campaignParameters));
    return campaignParameters;
  }

  const storedParameters = window.sessionStorage.getItem('quanthos_campaign_parameters');
  if (storedParameters) {
    return JSON.parse(storedParameters) as Record<string, string>;
  }

  return campaignParameters;
}

// Captured once per page load so later navigation without UTMs keeps attribution.
export const initialCampaignParameters = getCampaignParameters();

export function trackConversion(eventName: string, parameters?: Record<string, unknown>) {
  const eventParameters = { ...initialCampaignParameters, ...getCampaignParameters(), ...parameters };
  trackMetaEvent(eventName, eventParameters);
  trackGoogleEvent(eventName === 'Lead' ? 'generate_lead' : 'contact', eventParameters);
}
