import { siteConfig } from './siteConfig';

/** 0 — הבוט מתקשר. 1 — השארת פרטים בלי שיחה. */
export type LeadContactFlag = 0 | 1;

export async function submitLeadWebhook(input: {
  name: string;
  phone: string;
  contact: LeadContactFlag;
}): Promise<void> {
  const response = await fetch(siteConfig.leadWebhookUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: input.name.trim(),
      phone: input.phone.trim(),
      contact: input.contact,
    }),
  });

  if (!response.ok) {
    throw new Error('lead webhook failed');
  }
}
