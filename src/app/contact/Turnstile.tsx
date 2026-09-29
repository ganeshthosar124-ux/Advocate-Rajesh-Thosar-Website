"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Cloudflare Turnstile spam check.
 *
 * Rendered explicitly (not via the auto-render class) so it also appears after
 * client-side navigation, and reset whenever `resetKey` changes because each
 * token can be verified only once. The token is reported through `onToken`
 * and submitted by the parent in a controlled hidden input, so React's
 * automatic form reset cannot clear it.
 */
export function Turnstile({
  siteKey,
  resetKey,
  onToken,
}: {
  siteKey: string;
  resetKey: unknown;
  onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const api = window.turnstile;
    if (!ready || !api || !container.current || widgetId.current) return;
    widgetId.current = api.render(container.current, {
      sitekey: siteKey,
      theme: "light",
      "response-field": false,
      callback: (token: string) => {
        setFailed(false);
        onToken(token);
      },
      "expired-callback": () => onToken(""),
      "error-callback": () => {
        onToken("");
        setFailed(true);
      },
    });
    return () => {
      if (widgetId.current) api.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [ready, siteKey, onToken]);

  // A fresh token is needed after every submission.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
    onToken("");
  }, [resetKey, onToken]);

  return (
    <div>
      <Script src={SCRIPT_URL} strategy="afterInteractive" onReady={() => setReady(true)} onError={() => setFailed(true)} />
      <div ref={container} />
      {failed && (
        <p role="alert" className="mt-2 text-sm text-maroon">
          The spam check could not be loaded. Please reload the page, or contact the office by telephone or email.
        </p>
      )}
    </div>
  );
}
