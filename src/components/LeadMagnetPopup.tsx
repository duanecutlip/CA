import { useState, useEffect, useRef } from 'react';

export default function LeadMagnetPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;
    if (localStorage.getItem('leadPopupShown')) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ name, phone, guide: '7 Things Every Family Should Know' });
    localStorage.setItem('leadPopupShown', '1');
    setSubmitted(true);
  }

  function handleClose() {
    localStorage.setItem('leadPopupShown', '1');
    setVisible(false);
  }

  return (
    <>
      {/* Sentinel placed at ~50% scroll depth */}
      <div ref={sentinelRef} style={{ position: 'absolute', top: '50%', left: 0, width: 1, height: 1, pointerEvents: 'none' }} aria-hidden="true" />

      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/50 p-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-charcoal-400 hover:bg-linen hover:text-charcoal-700"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>

            {submitted ? (
              <div className="text-center py-4">
                <svg className="mx-auto mb-3 h-10 w-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p className="font-heading text-xl font-bold text-charcoal-900">We'll send it right over!</p>
                <p className="mt-1 text-charcoal-500">Check your phone for the guide.</p>
              </div>
            ) : (
              <>
                <h2 className="font-heading text-xl font-bold text-charcoal-900 mb-2 pr-8">
                  Free Guide: 7 Things Every Family Should Know About Pre-Need Planning
                </h2>
                <p className="text-charcoal-500 mb-6 text-sm">
                  Get the plain-English guide Duane shares with every family he meets.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-[56px] w-full rounded-lg border border-[#D4CFC8] bg-white px-4 text-lg text-charcoal-900 placeholder:text-charcoal-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="h-[56px] w-full rounded-lg border border-[#D4CFC8] bg-white px-4 text-lg text-charcoal-900 placeholder:text-charcoal-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                  <button
                    type="submit"
                    className="h-[56px] w-full rounded-lg bg-teal-600 text-lg font-semibold text-white hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  >
                    Send Me the Guide
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
