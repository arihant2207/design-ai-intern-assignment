export type ApplicantStatus = "Student" | "Young professional";

export interface LeadPayload {
  name: string;
  email: string;
  whatsapp: string;
  status: ApplicantStatus;
  trackId: string;
  referral?: string;
  consent: boolean;
  /** Hidden anti-bot honeypot; must remain empty for genuine submissions */
  website?: string;
}

export interface LeadSubmissionResult {
  ok: true;
  submittedAt: string;
}

/**
 * Isolated front-end prototype submission handler.
 * Resolves after a short local delay without making any network requests.
 *
 * TODO (Production integration): Replace the simulated delay below with a POST
 * request to your form webhook or CRM endpoint (e.g. fetch("/api/academy/leads", ...))
 * after validating the honeypot and consent fields server-side.
 */
export async function submitLead(
  payload: LeadPayload
): Promise<LeadSubmissionResult> {
  // Short deterministic-feeling delay so submitting state is visible to users.
  await new Promise((resolve) => setTimeout(resolve, 650));

  // Honeypot check: quietly resolve without forwarding if a bot filled the hidden field.
  if (payload.website && payload.website.trim().length > 0) {
    return {
      ok: true,
      submittedAt: new Date().toISOString(),
    };
  }

  return {
    ok: true,
    submittedAt: new Date().toISOString(),
  };
}

/**
 * Isolated front-end handler for the one-field "Download syllabus" modal.
 * Does not send an email or trigger a file download in prototype mode.
 *
 * TODO (Production integration): Connect to an email/PDF delivery webhook.
 */
export async function submitSyllabusRequest(
  email: string
): Promise<{ ok: true }> {
  void email;
  await new Promise((resolve) => setTimeout(resolve, 450));
  return { ok: true };
}
