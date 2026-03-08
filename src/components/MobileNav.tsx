import { useState } from 'react';
import { PHONE, PHONE_RAW, NAV_LINKS } from '../consts';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold tracking-wide text-charcoal-700 md:hidden"
        aria-label="Open navigation menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        MENU
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-linen">
          <div className="flex items-center justify-between px-5 py-4">
            <a
              href={`tel:${PHONE_RAW}`}
              className="font-heading text-lg font-bold text-burgundy-600"
            >
              {PHONE}
            </a>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold tracking-wide text-charcoal-700"
              aria-label="Close navigation menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              CLOSE
            </button>
          </div>

          <nav className="flex flex-1 flex-col px-5 pt-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center border-b border-border-light font-body text-lg font-medium text-charcoal-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/service-areas"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center border-b border-border-light font-body text-lg font-medium text-charcoal-900"
            >
              Service Areas
            </a>
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center border-b border-border-light font-body text-lg font-medium text-charcoal-900"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
