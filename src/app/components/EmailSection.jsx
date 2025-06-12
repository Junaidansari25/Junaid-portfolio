'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GithubIcon from '../../../public/github-icon.svg';
import LinkedinIcon from '../../../public/linkedin-icon.svg';

export default function EmailSection() {
  const [status, setStatus]   = useState('idle');  // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // grab the form element before any awaits
    const formElement = e.currentTarget;

    setStatus('sending');
    setErrorMsg('');

    const formData = new FormData(formElement);
    const payload = {
      email:   formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/send-email', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        // reset the form via the saved reference
        formElement.reset();
      } else {
        setErrorMsg(data.error || 'Unknown error');
        setStatus('error');
      }
    } catch (err) {
      console.error('Network error:', err);
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 py-24 gap-4 relative"
    >
      {/* Background glow */}
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                      from-primary-900 to-transparent rounded-full
                      h-80 w-80 absolute top-3/4 -left-4 blur-lg transform
                      -translate-x-1/2 -translate-y-1/2 z-0" />

      {/* Intro + Socials */}
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I&apos;m currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
        <div className="flex gap-2">
          <Link href="https://github.com/Junaidansari25" target="_blank" rel="noopener noreferrer">
            <Image src={GithubIcon} alt="Github" />
          </Link>
          <Link href="https://www.linkedin.com/in/junaid-ansari-4700a4187/"target="_blank">
            <Image src={LinkedinIcon} alt="LinkedIn" />
          </Link>
        </div>
      </div>

      {/* Form or Status Message */}
      <div className="z-10">
        {status === 'success' ? (
          <p className="text-green-500 text-sm mt-2">
            ✅ Your message has been sent!
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-white mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9]
                         text-gray-100 text-sm rounded-lg w-full p-2.5 mb-6"
              placeholder="you@example.com"
            />

            <label htmlFor="subject" className="text-white mb-2 text-sm font-medium">
              Subject
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9]
                         text-gray-100 text-sm rounded-lg w-full p-2.5 mb-6"
              placeholder="Just saying hi"
            />

            <label htmlFor="message" className="text-white mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={4}
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9]
                         text-gray-100 text-sm rounded-lg w-full p-2.5 mb-6"
              placeholder="Let's talk about..."
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium
                         py-2.5 rounded-lg w-full mb-2"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'error' && (
              <p className="text-red-500 text-sm">
                ❌ There was an error sending your message: {errorMsg}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
