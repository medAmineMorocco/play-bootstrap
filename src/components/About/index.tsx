export type Feature = {
  title: string;
  description: string;
  image: string;
  position: string;
  features: string[];
};

const About = ({ features }: {features: Feature[]}) => {
  return (
    <section
      id="about"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        {features?.map((feature: Feature) => {
          if (feature.position === "right") {
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
                    <ul>
                      {feature.features.map(feat => <li key={feat} className="flex mb-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="mr-2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {feat}
                      </li>)}
                    </ul>

                  </div>
                </div>

                <div className="w-full px-4 lg:w-1/2">
                  <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                    <div className="w-full px-2 sm:px-4 lg:px-2 xl:px-4">
                      <div
                        className={`relative mb-4 sm:mb-8`}
                      >
                        <img
                          src={`/images/home/${feature.image}.png`}
                          alt="about image"
                          style={{ boxShadow: '0 1.5rem 2rem -0.5rem rgba(0, 0, 0, 0.07),0 0.25rem 2rem 0 rgba(0, 0, 0, 0.03)'}}
                          className="h-full w-full rounded object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>;
          }
          return <div key={feature.title} className="wow fadeInUp" data-wow-delay=".2s">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 lg:w-1/2">
                <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                  <div className="w-full px-2 sm:px-4 lg:px-2 xl:px-4">
                    <div
                      className={`relative mb-4 sm:mb-8`}
                    >
                      <img
                        src={`/images/home/${feature.image}.png`}
                        alt="about image"
                        style={{ boxShadow: '0 1.5rem 2rem -0.5rem rgba(0, 0, 0, 0.07),0 0.25rem 2rem 0 rgba(0, 0, 0, 0.03)'}}
                        className="h-full w-full rounded object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </div>

                </div>
              </div>

              <div className="w-full px-4 lg:w-1/2">
                <div className="mb-12 max-w-[540px] lg:mb-0">
                  <h2
                    className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                    {feature.title}
                  </h2>
                  <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                    {feature.description}
                  </p>
                  <ul>
                    {feature.features.map(feat => <li key={feat} className="flex mb-2 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           className="mr-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feat}
                    </li>)}
                  </ul>

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
