"use client";

import React, { useEffect, useRef, useState } from "react";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import Image from "next/image";


const Modal = ({ SUBSCRIPTION_URL }: { SUBSCRIPTION_URL: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<Boolean | null>(null);
  const [msgError, setMessageError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: any) => {
      const target = event.target as Node;
      if (!modal.current || !trigger.current) {
        return;
      }
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      ){
        return;
      }
      if (!loading) {
        setModalOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: any) => {
      if (!modalOpen || event.keyCode !== 27) {
        return;
      }
      if (!loading) {
        setModalOpen(false);
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const onEmailChange = (event: any) => {
    setEmail(event.target.value);
  }

  const onConfirm = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setIsSuccess(null);
    setMessageError(null);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email: email
      }),
    } as any;
    fetch(`${SUBSCRIPTION_URL}/api/trials`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setIsSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        setMessageError(error.message);
        setLoading(false);
      });
  }

  return (
    <>
        <button
          ref={trigger}
          onClick={() => setModalOpen(true)}
          className={`rounded-md bg-primary px-6 py-3 text-base font-medium text-white`}
        >
          Try Now
        </button>
        <div
          className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5 z-[9999] ${
            modalOpen ? "block" : "hidden"
          }`}
        >
          <div
            ref={modal}
            className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
          >
            <div className="flex justify-center">
              <Image
                src={`/images/logo/logo-dark.svg`}
                alt="logo"
                width={80}
                height={30}
              />
            </div>

            <h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl">
              Get Your License Key
            </h3>
            <div className="-mx-3 flex flex-wrap">
              <div className='w-full px-4'>
                <div className='flex w-full mb-4'>
                  <div className='w-full relative'>
                    <input
                      value={email}
                      onChange={onEmailChange}
                      type='email'
                      placeholder='Email'
                      className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
                    />
                    <span className='absolute top-1/2 left-4 -translate-y-1/2'>
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity={0.8} fillRule="evenodd" clipRule="evenodd" fill="#9CA3AF">
                          <path
                            d="M3.334 4.167A.838.838 0 0 0 2.501 5v10c0 .456.377.833.833.833h13.333a.838.838 0 0 0 .834-.833V5a.838.838 0 0 0-.834-.833H3.334ZM.834 5c0-1.377 1.123-2.5 2.5-2.5h13.333c1.377 0 2.5 1.123 2.5 2.5v10c0 1.377-1.123 2.5-2.5 2.5H3.334a2.505 2.505 0 0 1-2.5-2.5V5Z" />
                          <path
                            d="M.985 4.522a.833.833 0 0 1 1.16-.205l7.856 5.499 7.855-5.5a.833.833 0 1 1 .956 1.366l-8.333 5.833a.833.833 0 0 1-.956 0L1.19 5.682a.833.833 0 0 1-.205-1.16Z" />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-3">
                <button
                  onClick={() => !loading && setModalOpen(false)}
                  className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
                >
                  Cancel
                </button>
              </div>
              <div className="w-1/2 px-3">
                <button
                  onClick={onConfirm}
                  onKeyDown={(e) => {
                    if (e.key === ' ') e.preventDefault(); // Block spacebar clicks
                  }}
                  className="inline-flex w-full h-12 items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-base font-medium text-white">
                  {loading && <span>
                    <svg
                      className="animate-spin"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.5"
                        cx="10"
                        cy="10"
                        r="9"
                        stroke="white"
                        stroke-width="2"
                      />
                      <mask id="path-2-inside-1_2527_20936" fill="white">
                        <path
                          d="M18.4713 13.0345C18.9921 13.221 19.5707 12.9508 19.7043 12.414C20.0052 11.2042 20.078 9.94582 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.6285 0.597723 12.4262 0.219019 11.1884 0.0708647C10.6392 0.00512742 10.1811 0.450137 10.1706 1.00319C10.1601 1.55625 10.6018 2.00666 11.1492 2.08616C12.0689 2.21971 12.9609 2.51295 13.7841 2.95511C14.9023 3.55575 15.8615 4.41394 16.5823 5.45872C17.3031 6.50351 17.7649 7.70487 17.9294 8.96348C18.0505 9.89002 18.008 10.828 17.8063 11.7352C17.6863 12.2751 17.9506 12.848 18.4713 13.0345Z" />
                      </mask>
                      <path
                        d="M18.4713 13.0345C18.9921 13.221 19.5707 12.9508 19.7043 12.414C20.0052 11.2042 20.078 9.94582 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.6285 0.597723 12.4262 0.219019 11.1884 0.0708647C10.6392 0.00512742 10.1811 0.450137 10.1706 1.00319C10.1601 1.55625 10.6018 2.00666 11.1492 2.08616C12.0689 2.21971 12.9609 2.51295 13.7841 2.95511C14.9023 3.55575 15.8615 4.41394 16.5823 5.45872C17.3031 6.50351 17.7649 7.70487 17.9294 8.96348C18.0505 9.89002 18.008 10.828 17.8063 11.7352C17.6863 12.2751 17.9506 12.848 18.4713 13.0345Z"
                        stroke="white"
                        stroke-width="4"
                        mask="url(#path-2-inside-1_2527_20936)"
                      />
                    </svg>
                  </span>}
                  Confirm
                </button>
              </div>

              <div className="pt-4 bg-white dark:bg-dark-2">
                <div className="container">
                  <div
                    className="border-blue bg-blue-light-4 flex w-full rounded-lg border-l-[6px] px-7 py-3 md:p-4">
                    <div
                      className="bg-blue mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md">
                      <SafetyCertificateOutlined className="text-white" />
                    </div>
                    <div className="w-full">
                      <p className="text-base text-left leading-relaxed text-blue">
                        Your free trial license key will be sent to this email address.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {isSuccess && <div className="w-full pt-4 bg-white dark:bg-dark-2">
                <div className="container">
                  <div className="rounded-md bg-[#C4F9E2] p-4">
                    <p className="flex items-center text-sm font-medium text-[#004434]">
                      <span className="pr-3">
                        <svg
                          width={20}
                          height={20}
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
                      Email sent successfully!
                    </p>
                  </div>
                </div>
              </div>}

              {msgError && <div className="w-full bg-white pt-4 dark:bg-dark-2">
                <div className="container">
                  <div
                    className="rounded-lg bg-red-light-6 px-[18px] py-4 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]">
                    <p className="flex items-center text-sm font-medium text-[#BC1C21]">
                      <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-red">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_961_15656)">
                            <path
                              d="M6 0.337494C2.86875 0.337494 0.3375 2.86874 0.3375 5.99999C0.3375 9.13124 2.86875 11.6812 6 11.6812C9.13125 11.6812 11.6813 9.13124 11.6813 5.99999C11.6813 2.86874 9.13125 0.337494 6 0.337494ZM6 10.8375C3.3375 10.8375 1.18125 8.66249 1.18125 5.99999C1.18125 3.33749 3.3375 1.18124 6 1.18124C8.6625 1.18124 10.8375 3.35624 10.8375 6.01874C10.8375 8.66249 8.6625 10.8375 6 10.8375Z"
                              fill="white"
                            />
                            <path
                              d="M7.725 4.25625C7.55625 4.0875 7.29375 4.0875 7.125 4.25625L6 5.4L4.85625 4.25625C4.6875 4.0875 4.425 4.0875 4.25625 4.25625C4.0875 4.425 4.0875 4.6875 4.25625 4.85625L5.4 6L4.25625 7.14375C4.0875 7.3125 4.0875 7.575 4.25625 7.74375C4.33125 7.81875 4.44375 7.875 4.55625 7.875C4.66875 7.875 4.78125 7.8375 4.85625 7.74375L6 6.6L7.14375 7.74375C7.21875 7.81875 7.33125 7.875 7.44375 7.875C7.55625 7.875 7.66875 7.8375 7.74375 7.74375C7.9125 7.575 7.9125 7.3125 7.74375 7.14375L6.6 6L7.74375 4.85625C7.89375 4.6875 7.89375 4.425 7.725 4.25625Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_961_15656">
                              <rect width="12" height="12" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      {msgError}
                    </p>
                  </div>
                </div>
              </div>
              }

            </div>
          </div>
        </div>
    </>
  );
};

export default Modal;
