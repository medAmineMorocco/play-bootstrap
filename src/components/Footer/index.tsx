import Image from "next/image";
import Link from "next/link";
import { LinkedinOutlined, XOutlined, YoutubeOutlined } from "@ant-design/icons";

const TWITTER_PAGE_URL = process.env.NEXT_PUBLIC_TWITTER_PAGE_URL;
const LINKEDIN_PAGE_URL = process.env.NEXT_PUBLIC_LINKEDIN_PAGE_URL;
const YOUTUBE_PAGE_URL = process.env.NEXT_PUBLIC_YOUTUBE_PAGE_URL;

const TERMS_OF_SERVICE_URL = process.env.NEXT_PUBLIC_TERMS_OF_SERVICE_URL;
const LEGAL_NOTICE_URL = process.env.NEXT_PUBLIC_LEGAL_NOTICE_URL;
const PRIVACY_POLICY_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;

const Footer = () => {
  return (
    <footer
      className="wow fadeInUp relative z-10 bg-[#090E34] pt-8"
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className="w-full">
          <div className="w-full text-center">
            <div className="mb-10 w-full">
              <Link href="/" className="mb-6 inline-block max-w-[160px]">
                <Image
                  src="/images/logo/logo-white.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="max-w-full"
                />
              </Link>
              <p className="mb-8 w-full text-base text-gray-7">
                We streamline worktree management for software engineers and companies with WorktreeWise.
              </p>
              <div className="-mx-3 flex justify-center">
                <a
                  aria-label="social link"
                  href={TWITTER_PAGE_URL}
                  target="_blank"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <XOutlined />
                </a>
                <a
                  aria-label="social link"
                  href={LINKEDIN_PAGE_URL}
                  target="_blank"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <LinkedinOutlined />
                </a>
                <a
                  aria-label="social link"
                  href={YOUTUBE_PAGE_URL}
                  target="_blank"
                  className="px-3 text-gray-7 hover:text-white hover:underline"
                >
                  <YoutubeOutlined />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#8890A4] border-opacity-40 py-8 flex-grow">
            <div className="container">
              <div className="flex justify-center">
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                >
                  Privacy policy
                </a>
                <a
                  href={LEGAL_NOTICE_URL}
                  target="_blank"
                  className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                >
                  Legal notice
                </a>
                <a
                  href={TERMS_OF_SERVICE_URL}
                  target="_blank"
                  className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                >
                  Terms of service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
