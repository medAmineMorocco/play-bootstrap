import Image from "next/image";
import Link from "next/link";
import { LinkedinOutlined, XOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer
      className="wow fadeInUp relative z-10 bg-[#090E34] pt-8"
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className="w-full -mx-4 flex flex-wrap">
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12">
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
              <p className="mb-8 max-w-[270px] text-base text-gray-7">
                We create digital experiences for brands and companies by using
                technology.
              </p>
              <div className="-mx-3 flex items-center">
                <a
                  aria-label="social link"
                  href="/#"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <XOutlined />
                </a>
                <a
                  aria-label="social link"
                  href="/#"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <LinkedinOutlined />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px] flex-grow">
            <div className="container">
              <div className="-mx-4 flex flex-wrap justify-end">
                <div className="w-full px-4 md:w-2/3 lg:w-1/2">
                  <div className="my-1">
                    <div className="-mx-3 flex items-center justify-center md:justify-start">
                      <a
                        href="/#"
                        className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                      >
                        Privacy policy
                      </a>
                      <a
                        href="/#"
                        className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                      >
                        Legal notice
                      </a>
                      <a
                        href="/#"
                        className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                      >
                        Terms of service
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
