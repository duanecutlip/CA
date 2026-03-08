import { useState } from 'react';

export default function CallbackForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bestTime, setBestTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ name, phone, bestTime });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-teal-600/20 bg-teal-600/5 p-6 text-center">
        <svg className="mx-auto mb-3 h-10 w-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <p className="font-heading text-xl font-bold text-charcoal-900">Thank you!</p>
        <p className="mt-1 text-charcoal-500">Duane will call you back.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cb-name" className="mb-1 block text-sm font-medium text-charcoal-700">
          Your Name
        </label>
        <input
          id="cb-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-[56px] w-full rounded-lg border border-[#D4CFC8] bg-white px-4 text-lg text-charcoal-900 placeholder:text-charcoal-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          placeholder="Full name"
        />
      </div>
      <div>
        <label htmlFor="cb-phone" className="mb-1 block text-sm font-medium text-charcoal-700">
          Phone Number
        </label>
        <input
          id="cb-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-[56px] w-full rounded-lg border border-[#D4CFC8] bg-white px-4 text-lg text-charcoal-900 placeholder:text-charcoal-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          placeholder="(555) 123-4567"
        />
      </div>
      <div>
        <label htmlFor="cb-time" className="mb-1 block text-sm font-medium text-charcoal-700">
          Best Time to Call
        </label>
        <select
          id="cb-time"
          required
          value={bestTime}
          onChange={(e) => setBestTime(e.target.value)}
          className="h-[56px] w-full rounded-lg border border-[#D4CFC8] bg-white px-4 text-lg text-charcoal-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
        >
          <option value="">Select a time</option>
          <option value="Morning 9-12">Morning 9-12</option>
          <option value="Afternoon 12-3">Afternoon 12-3</option>
          <option value="Late Afternoon 3-5">Late Afternoon 3-5</option>
        </select>
      </div>
      <button
        type="submit"
        className="h-[56px] w-full rounded-lg bg-teal-600 text-lg font-semibold text-white hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
      >
        Request My Free Callback
      </button>
    </form>
  );
}
