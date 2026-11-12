"use client";

import React, { useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBSCRIPTIONS_URL = process.env.NEXT_PUBLIC_SUBSCRIPTIONS_URL || "";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [msgError, setMessageError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (!emailPattern.test(trimmedEmail)) {
      setMessageError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setIsSuccess(null);
    setMessageError(null);

    fetch(`${SUBSCRIPTIONS_URL}/api/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: trimmedEmail,
      }),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(
            data?.error || `HTTP error! Status: ${response.status}`,
          );
        }
        return data;
      })
      .then(() => {
        setIsSuccess(true);
        setEmail("");
        setLoading(false);
      })
      .catch((error) => {
        setMessageError(error.message || "Failed to subscribe");
        setLoading(false);
      });
  };

  return (
    <div
      className="not-prose wow fadeInUp relative mb-12 overflow-hidden rounded-xl bg-primary px-8 py-12 text-center shadow-lg sm:px-11 sm:py-[54px] lg:px-8"
      data-wow-delay=".1s"
    >
      <h3 className="!mb-2 !mt-0 text-[28px] font-bold leading-[38px] !text-white">
        Join our newsletter!
      </h3>
      <p className="!mb-6 text-base !text-white/95">
        Enter your email to receive our latest newsletter.
      </p>
      <form onSubmit={handleSubmit} className="mx-auto max-w-[480px]">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          required
          disabled={loading}
          className="mb-3.5 h-[50px] w-full rounded-lg border border-white/20 bg-white px-4 text-center text-base font-medium !text-dark shadow-sm outline-none placeholder:!text-gray-500 focus:ring-2 focus:ring-white/60 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="mb-4 inline-flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-dark text-center text-sm font-semibold !text-white shadow-md transition duration-200 ease-in-out hover:bg-dark/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Subscribing..." : "Subscribe Now"}
        </button>
      </form>
      <p className="!mb-0 text-sm font-medium !text-white/90">
        Don&#39;t worry, we don&#39;t spam
      </p>

      {isSuccess && (
        <div className="mx-auto mt-4 max-w-[480px] rounded-lg bg-[#C4F9E2] p-3 text-left">
          <p className="!mb-0 flex items-center text-sm font-semibold !text-[#004434]">
            <span className="pr-2.5">
              <svg
                width={18}
                height={18}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={10} cy={10} r={10} fill="#00B078" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.1203 6.78954C14.3865 7.05581 14.3865 7.48751 14.1203 7.75378L9.12026 12.7538C8.85399 13.02 8.42229 13.02 8.15602 12.7538L5.88329 10.4811C5.61703 10.2148 5.61703 9.78308 5.88329 9.51682C6.14956 9.25055 6.58126 9.25055 6.84753 9.51682L8.63814 11.3074L13.156 6.78954C13.4223 6.52328 13.854 6.52328 14.1203 6.78954Z"
                  fill="white"
                />
              </svg>
            </span>
            Subscribed successfully!
          </p>
        </div>
      )}

      {msgError && (
        <div className="mx-auto mt-4 max-w-[480px] rounded-lg bg-[#FEE2E2] p-3 text-left">
          <p className="!mb-0 flex items-center text-sm font-semibold !text-[#991B1B]">
            {msgError}
          </p>
        </div>
      )}

      <div>
        <span className="absolute right-0 top-0">
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="1.39737"
              cy="44.6026"
              r="1.39737"
              transform="rotate(-90 1.39737 44.6026)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="1.39737"
              cy="7.9913"
              r="1.39737"
              transform="rotate(-90 1.39737 7.9913)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="13.6943"
              cy="44.6026"
              r="1.39737"
              transform="rotate(-90 13.6943 44.6026)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="13.6943"
              cy="7.9913"
              r="1.39737"
              transform="rotate(-90 13.6943 7.9913)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="25.9911"
              cy="44.6026"
              r="1.39737"
              transform="rotate(-90 25.9911 44.6026)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="25.9911"
              cy="7.9913"
              r="1.39737"
              transform="rotate(-90 25.9911 7.9913)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="38.288"
              cy="44.6026"
              r="1.39737"
              transform="rotate(-90 38.288 44.6026)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="38.288"
              cy="7.9913"
              r="1.39737"
              transform="rotate(-90 38.288 7.9913)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="1.39737"
              cy="32.3058"
              r="1.39737"
              transform="rotate(-90 1.39737 32.3058)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="13.6943"
              cy="32.3058"
              r="1.39737"
              transform="rotate(-90 13.6943 32.3058)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="25.9911"
              cy="32.3058"
              r="1.39737"
              transform="rotate(-90 25.9911 32.3058)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="38.288"
              cy="32.3058"
              r="1.39737"
              transform="rotate(-90 38.288 32.3058)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="1.39737"
              cy="20.0086"
              r="1.39737"
              transform="rotate(-90 1.39737 20.0086)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="13.6943"
              cy="20.0086"
              r="1.39737"
              transform="rotate(-90 13.6943 20.0086)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="25.9911"
              cy="20.0086"
              r="1.39737"
              transform="rotate(-90 25.9911 20.0086)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="38.288"
              cy="20.0086"
              r="1.39737"
              transform="rotate(-90 38.288 20.0086)"
              fill="white"
              fillOpacity="0.44"
            />
          </svg>
        </span>
        <span className="absolute bottom-0 left-0">
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="1.39737"
              cy="44.6026"
              r="1.39737"
              transform="rotate(-90 1.39737 44.6026)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="1.39737"
              cy="7.9913"
              r="1.39737"
              transform="rotate(-90 1.39737 7.9913)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="13.6943"
              cy="44.6026"
              r="1.39737"
              transform="rotate(-90 13.6943 44.6026)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="13.6943"
              cy="7.9913"
              r="1.39737"
              transform="rotate(-90 13.6943 7.9913)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="25.9911"
              cy="44.6026"
              r="1.39737"
              transform="rotate(-90 25.9911 44.6026)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="25.9911"
              cy="7.9913"
              r="1.39737"
              transform="rotate(-90 25.9911 7.9913)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="38.288"
              cy="44.6026"
              r="1.39737"
              transform="rotate(-90 38.288 44.6026)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="38.288"
              cy="7.9913"
              r="1.39737"
              transform="rotate(-90 38.288 7.9913)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="1.39737"
              cy="32.3058"
              r="1.39737"
              transform="rotate(-90 1.39737 32.3058)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="13.6943"
              cy="32.3058"
              r="1.39737"
              transform="rotate(-90 13.6943 32.3058)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="25.9911"
              cy="32.3058"
              r="1.39737"
              transform="rotate(-90 25.9911 32.3058)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="38.288"
              cy="32.3058"
              r="1.39737"
              transform="rotate(-90 38.288 32.3058)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="1.39737"
              cy="20.0086"
              r="1.39737"
              transform="rotate(-90 1.39737 20.0086)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="13.6943"
              cy="20.0086"
              r="1.39737"
              transform="rotate(-90 13.6943 20.0086)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="25.9911"
              cy="20.0086"
              r="1.39737"
              transform="rotate(-90 25.9911 20.0086)"
              fill="white"
              fillOpacity="0.44"
            />
            <circle
              cx="38.288"
              cy="20.0086"
              r="1.39737"
              transform="rotate(-90 38.288 20.0086)"
              fill="white"
              fillOpacity="0.44"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Newsletter;
