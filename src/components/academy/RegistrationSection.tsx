"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { NEXT_STEPS, TRACKS, WHATSAPP_SAMPLE_URL } from "@/lib/academy-config";
import { submitLead, type ApplicantStatus } from "@/lib/leads";

interface RegistrationSectionProps {
  selectedStatus: ApplicantStatus;
  onStatusChange: (status: ApplicantStatus) => void;
  selectedTrackId: string;
  onTrackChange: (trackId: string) => void;
  sectionRef: React.RefObject<HTMLElement | null>;
}

interface FormErrors {
  name?: string;
  email?: string;
  whatsapp?: string;
  trackId?: string;
  consent?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeWhatsappDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  return digits;
}

export function RegistrationSection({
  selectedStatus,
  onStatusChange,
  selectedTrackId,
  onTrackChange,
  sectionRef,
}: RegistrationSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const status = selectedStatus;
  const trackId = selectedTrackId || TRACKS[0].id;
  const [referral, setReferral] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // hidden honeypot

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    trackName: string;
    status: ApplicantStatus;
  } | null>(null);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = "Enter your full name (at least 2 characters).";
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Enter a valid email address (for example, name@domain.com).";
    }

    const digits = normalizeWhatsappDigits(whatsapp);
    if (digits.length !== 10) {
      nextErrors.whatsapp =
        "Enter a 10-digit WhatsApp number after +91 (digits only, no leading zero).";
    }

    if (!trackId) {
      nextErrors.trackId = "Select the track you are interested in.";
    }

    if (!consent) {
      nextErrors.consent =
        "Please confirm you would like us to contact you about cohort details.";
    }

    return nextErrors;
  };

  const clearFieldError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await submitLead({
        name: name.trim(),
        email: email.trim(),
        whatsapp: `+91${normalizeWhatsappDigits(whatsapp)}`,
        status,
        trackId,
        referral: referral.trim() || undefined,
        consent,
        website,
      });

      const matchedTrack = TRACKS.find((t) => t.id === trackId);
      setSubmittedSummary({
        name: name.trim(),
        trackName: matchedTrack?.name ?? trackId,
        status,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedSummary(null);
    setName("");
    setEmail("");
    setWhatsapp("");
    setReferral("");
    setConsent(false);
    setWebsite("");
    setErrors({});
  };

  return (
    <section
      id="register"
      ref={sectionRef}
      aria-labelledby="register-heading"
      className="bg-[var(--academy-paper)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="academy-mono text-xs font-medium uppercase tracking-wider text-[var(--academy-muted)]">
            Enquiry Form
          </p>
          <h2
            id="register-heading"
            className="academy-display mt-2 text-3xl font-bold text-[var(--academy-ink)] sm:text-4xl"
          >
            Request{" "}
            <span className="academy-chalk-mark">batch details</span> for your
            track.
          </h2>
          <p className="mt-3 text-base text-[var(--academy-muted)]">
            Next batch announced on enquiry. Fee shared on enquiry before you
            commit to a seat.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Form or designed success state */}
          <div className="rounded-lg border border-[var(--academy-line)] bg-[var(--academy-surface)] p-6 sm:p-8 lg:col-span-7">
            {submittedSummary ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                role="status"
                aria-live="polite"
                className="py-4"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--academy-cobalt)] bg-[var(--academy-chalk)] text-[var(--academy-ink)]">
                  <CheckCircle2 className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>

                <h3 className="academy-display mt-4 text-2xl font-bold text-[var(--academy-ink)]">
                  Batch details request recorded (prototype)
                </h3>
                <p className="mt-2 text-base text-[var(--academy-muted)]">
                  Thanks,{" "}
                  <span className="font-semibold text-[var(--academy-ink)]">
                    {submittedSummary.name}
                  </span>
                  . Your request for{" "}
                  <span className="font-semibold text-[var(--academy-ink)]">
                    {submittedSummary.trackName}
                  </span>{" "}
                  ({submittedSummary.status}) passed validation.
                </p>

                <div className="mt-5 rounded border border-[var(--academy-line)] bg-[var(--academy-paper)] p-4 text-sm text-[var(--academy-ink)]">
                  <p className="academy-mono text-xs font-semibold uppercase text-[var(--academy-cobalt)]">
                    Front-end prototype note
                  </p>
                  <p className="mt-1 text-sm text-[var(--academy-muted)]">
                    No network request, email, or WhatsApp message was sent. In
                    production, this &ldquo;Request batch details&rdquo; flow
                    connects to a webhook to share upcoming dates and fees.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  {/* Links to a clearly fake sample WhatsApp number for prototype demo */}
                  <a
                    href={WHATSAPP_SAMPLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp (opens sample WhatsApp link)"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-[var(--academy-line-strong)] bg-[var(--academy-paper)] px-4 py-2 text-sm font-semibold text-[var(--academy-ink)] transition-colors hover:border-[var(--academy-ink)]"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    Chat on WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-[var(--academy-line)] bg-[var(--academy-surface)] px-4 py-2 text-sm font-semibold text-[var(--academy-ink)] transition-colors hover:border-[var(--academy-line-strong)]"
                  >
                    Submit another request
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
                {/* Hidden anti-bot honeypot */}
                <div aria-hidden="true" className="sr-only">
                  <label htmlFor="reg-website">Website</label>
                  <input
                    id="reg-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="reg-name"
                    className="block text-sm font-semibold text-[var(--academy-ink)]"
                  >
                    Full name <span className="text-[var(--academy-cobalt)]">*</span>
                  </label>
                  <input
                    id="reg-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    disabled={isSubmitting}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearFieldError("name");
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "reg-name-error" : undefined}
                    placeholder="e.g. Ananya Deshmukh"
                    className="mt-1.5 min-h-[44px] w-full rounded-md border border-[var(--academy-line-strong)] bg-[var(--academy-paper)] px-3.5 py-2.5 text-base text-[var(--academy-ink)] placeholder:text-[var(--academy-muted)]/75 disabled:opacity-60"
                  />
                  {errors.name && (
                    <p
                      id="reg-name-error"
                      role="alert"
                      className="mt-1.5 text-sm font-medium text-[#B42318]"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email & WhatsApp */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="reg-email"
                      className="block text-sm font-semibold text-[var(--academy-ink)]"
                    >
                      Email address{" "}
                      <span className="text-[var(--academy-cobalt)]">*</span>
                    </label>
                    <input
                      id="reg-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      disabled={isSubmitting}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError("email");
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "reg-email-error" : undefined}
                      placeholder="you@example.com"
                      className="mt-1.5 min-h-[44px] w-full rounded-md border border-[var(--academy-line-strong)] bg-[var(--academy-paper)] px-3.5 py-2.5 text-base text-[var(--academy-ink)] placeholder:text-[var(--academy-muted)]/75 disabled:opacity-60"
                    />
                    {errors.email && (
                      <p
                        id="reg-email-error"
                        role="alert"
                        className="mt-1.5 text-sm font-medium text-[#B42318]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="reg-whatsapp"
                      className="block text-sm font-semibold text-[var(--academy-ink)]"
                    >
                      WhatsApp number{" "}
                      <span className="text-[var(--academy-cobalt)]">*</span>
                    </label>
                    <div className="mt-1.5 flex min-h-[44px] overflow-hidden rounded-md border border-[var(--academy-line-strong)] bg-[var(--academy-paper)] focus-within:outline-2 focus-within:outline-[var(--academy-cobalt)]">
                      <span className="academy-mono inline-flex items-center border-r border-[var(--academy-line)] bg-[var(--academy-surface-alt)] px-3 text-sm font-medium text-[var(--academy-ink)]">
                        +91
                      </span>
                      <input
                        id="reg-whatsapp"
                        name="whatsapp"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        required
                        disabled={isSubmitting}
                        value={whatsapp}
                        onChange={(e) => {
                          setWhatsapp(e.target.value);
                          clearFieldError("whatsapp");
                        }}
                        aria-invalid={Boolean(errors.whatsapp)}
                        aria-describedby={
                          errors.whatsapp
                            ? "reg-whatsapp-hint reg-whatsapp-error"
                            : "reg-whatsapp-hint"
                        }
                        placeholder="98765 43210"
                        className="w-full bg-transparent px-3 py-2.5 text-base text-[var(--academy-ink)] placeholder:text-[var(--academy-muted)]/75 focus:outline-none disabled:opacity-60"
                      />
                    </div>
                    <p
                      id="reg-whatsapp-hint"
                      className="mt-1 text-xs text-[var(--academy-muted)]"
                    >
                      10-digit Indian mobile number (+91)
                    </p>
                    {errors.whatsapp && (
                      <p
                        id="reg-whatsapp-error"
                        role="alert"
                        className="mt-1 text-sm font-medium text-[#B42318]"
                      >
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status radio group */}
                <fieldset disabled={isSubmitting}>
                  <legend className="block text-sm font-semibold text-[var(--academy-ink)]">
                    Current status{" "}
                    <span className="text-[var(--academy-cobalt)]">*</span>
                  </legend>
                  <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {(["Student", "Young professional"] as const).map((option) => {
                      const active = status === option;
                      return (
                        <label
                          key={option}
                          className={`flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-md border px-3.5 py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "border-[var(--academy-cobalt)] bg-[var(--academy-paper)] text-[var(--academy-ink)]"
                              : "border-[var(--academy-line)] bg-[var(--academy-surface)] text-[var(--academy-muted)] hover:border-[var(--academy-line-strong)]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="status"
                            value={option}
                            checked={active}
                            onChange={() => onStatusChange(option)}
                            className="h-4 w-4 accent-[var(--academy-cobalt)]"
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Interested track */}
                <div>
                  <label
                    htmlFor="reg-track"
                    className="block text-sm font-semibold text-[var(--academy-ink)]"
                  >
                    Interested track{" "}
                    <span className="text-[var(--academy-cobalt)]">*</span>
                  </label>
                  <select
                    id="reg-track"
                    name="trackId"
                    disabled={isSubmitting}
                    value={trackId}
                    onChange={(e) => {
                      onTrackChange(e.target.value);
                      clearFieldError("trackId");
                    }}
                    aria-invalid={Boolean(errors.trackId)}
                    aria-describedby={errors.trackId ? "reg-track-error" : undefined}
                    className="mt-1.5 min-h-[44px] w-full rounded-md border border-[var(--academy-line-strong)] bg-[var(--academy-paper)] px-3.5 py-2.5 text-base text-[var(--academy-ink)] disabled:opacity-60"
                  >
                    {TRACKS.map((track) => (
                      <option key={track.id} value={track.id}>
                        {track.code} — {track.name}
                      </option>
                    ))}
                  </select>
                  {errors.trackId && (
                    <p
                      id="reg-track-error"
                      role="alert"
                      className="mt-1.5 text-sm font-medium text-[#B42318]"
                    >
                      {errors.trackId}
                    </p>
                  )}
                </div>

                {/* Optional referral */}
                <div>
                  <label
                    htmlFor="reg-referral"
                    className="block text-sm font-semibold text-[var(--academy-ink)]"
                  >
                    How did you hear about us?{" "}
                    <span className="font-normal text-[var(--academy-muted)]">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="reg-referral"
                    name="referral"
                    type="text"
                    disabled={isSubmitting}
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                    placeholder="Friend, college club, LinkedIn, etc."
                    className="mt-1.5 min-h-[44px] w-full rounded-md border border-[var(--academy-line-strong)] bg-[var(--academy-paper)] px-3.5 py-2.5 text-base text-[var(--academy-ink)] placeholder:text-[var(--academy-muted)]/75 disabled:opacity-60"
                  />
                </div>

                {/* Consent checkbox */}
                <div>
                  <label className="flex min-h-[44px] cursor-pointer items-start gap-3 py-1 text-sm text-[var(--academy-ink)]">
                    <input
                      id="reg-consent"
                      name="consent"
                      type="checkbox"
                      disabled={isSubmitting}
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        clearFieldError("consent");
                      }}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? "reg-consent-error" : undefined}
                      className="mt-1 h-4 w-4 shrink-0 accent-[var(--academy-cobalt)]"
                    />
                    <span>
                      I agree to be contacted on email or WhatsApp with upcoming
                      batch dates, fee details, and track guidance.
                    </span>
                  </label>
                  {errors.consent && (
                    <p
                      id="reg-consent-error"
                      role="alert"
                      className="mt-1.5 text-sm font-medium text-[#B42318]"
                    >
                      {errors.consent}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={isSubmitting ? undefined : { scale: 0.985 }}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[var(--academy-cobalt)] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--academy-cobalt-hover)] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {isSubmitting ? "Sending request..." : "Request batch details"}
                  {!isSubmitting && (
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  )}
                </motion.button>
              </form>
            )}
          </div>

          {/* Right: What happens next 4-step list */}
          <aside
            aria-labelledby="next-steps-heading"
            className="rounded-lg border border-[var(--academy-line)] bg-[var(--academy-surface)] p-6 sm:p-8 lg:col-span-5"
          >
            <p className="academy-mono text-xs font-semibold uppercase tracking-wider text-[var(--academy-cobalt)]">
              After you enquire
            </p>
            <h3
              id="next-steps-heading"
              className="academy-display mt-2 text-2xl font-bold text-[var(--academy-ink)]"
            >
              What happens next
            </h3>

            <ol className="mt-6 divide-y divide-[var(--academy-line)] border-y border-[var(--academy-line)]">
              {NEXT_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="grid grid-cols-[40px_1fr] gap-3 py-4"
                >
                  <span className="academy-mono text-xs font-semibold text-[var(--academy-cobalt)]">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-[var(--academy-ink)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-[var(--academy-muted)]">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="academy-mono mt-5 text-xs text-[var(--academy-muted)]">
              Fee shared on enquiry · Next batch announced on enquiry
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
