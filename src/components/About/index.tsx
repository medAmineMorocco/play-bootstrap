import Image from "next/image";

export type Feature = {
  title: string;
  description: string;
  image: string;
  features: string[];
};

const ListItem = ({text}: { text: string }) => {
  return (
    <li className="flex text-base text-body-color dark:text-dark-6">
      <span className="mr-2.5 mt-0.5 text-primary">
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_980_24852)">
            <path
              d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
              fill="currentColor"
            />
            <path
              d="M12.6875 7.09375L8.96875 10.7188L7.28125 9.0625C7 8.78125 6.5625 8.8125 6.28125 9.0625C6 9.34375 6.03125 9.78125 6.28125 10.0625L8.28125 12C8.46875 12.1875 8.71875 12.2813 8.96875 12.2813C9.21875 12.2813 9.46875 12.1875 9.65625 12L13.6875 8.125C13.9688 7.84375 13.9688 7.40625 13.6875 7.125C13.4063 6.84375 12.9688 6.84375 12.6875 7.09375Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_980_24852">
              <rect width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
      {text}
    </li>
  );
};

const About = ({ features }: {features: Feature[]}) => {
  return (
    <section
      id="about"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        {features?.map((feature: Feature) => {
            return <div key={feature.title} className="wow fadeInUp" data-wow-delay=".2s">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-1/2">
                  <div className="mb-12 max-w-[540px] lg:mb-0">
                    <h2
                      className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                      {feature.title}
                    </h2>
                    <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.features.map(feat =>
                        <ListItem key={feat} text={feat} />
                    )}
                    </ul>

                  </div>
                </div>

                <div className="w-full px-4 lg:w-1/2">
                  <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                    <div className="w-full px-2 sm:px-4 lg:px-2 xl:px-4">
                      <div
                        className={`relative mb-4 sm:mb-8`}
                      >
                        <Image
                          src={`/images/home/${feature.image}.avif`}
                          alt="hero"
                          style={{ boxShadow: '0 1.5rem 2rem -0.5rem rgba(0, 0, 0, 0.07),0 0.25rem 2rem 0 rgba(0, 0, 0, 0.03)'}}
                          className="h-full w-full rounded object-cover object-center dark:[display:none]"
                          loading="lazy"
                          unoptimized
                          width={628}
                          height={353}
                        />
                        <Image
                          src={`/images/home/${feature.image}-dark.avif`}
                          alt="hero"
                          style={{ boxShadow: '0 1.5rem 2rem -0.5rem rgba(0, 0, 0, 0.07),0 0.25rem 2rem 0 rgba(0, 0, 0, 0.03)'}}
                          className="h-full w-full rounded object-cover object-center [display:none] dark:block"
                          loading="lazy"
                          unoptimized
                          width={628}
                          height={353}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>;
        })}

      </div>
    </section>
  );
};

export default About;
