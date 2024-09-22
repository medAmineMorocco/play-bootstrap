import Image from "next/image";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[540px] lg:mb-0">
                <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                  Meet the Creator
                </h2>
                <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                  Hi, I'm <strong className="dark:text-white">AMMACH MOHAMED AMINE</strong>, the creator and developer behind <strong className="dark:text-white">WorktreeWise</strong>.
                  As a
                  passionate developer myself,
                  I understand the challenges of managing multiple branches and worktrees across different environments.
                  I built <strong className="dark:text-white">WorktreeWise</strong> to solve these pain points, making it easier for developers like
                  you to handle
                  worktrees without the headaches.<br/><br/>
                  From writing the first line of code to designing the interface, I manage every aspect
                  of <strong className="dark:text-white">WorktreeWise</strong> myself. My mission is to create a tool that simplifies your workflow and gives you more time to focus
                  on what matters most — building great software.
                </p>

                <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                  Why I Built WorktreeWise ?
                </h2>
                <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                  <strong className="dark:text-white">WorktreeWise</strong> was born out of my own need for a more intuitive way to manage git
                  worktrees. I realized that while Git is an incredibly powerful tool, its worktree functionality could
                  be made simpler and more accessible for everyday development. I
                  created <strong className="dark:text-white">WorktreeWise</strong> to bring together
                  ease of use and flexibility, allowing you to efficiently switch between branches, manage workflows,
                  and keep your development environment organized.
                </p>

                <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                  What’s Next ?
                </h2>
                <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                  I’m constantly working on new features and improvements for <strong className="dark:text-white">WorktreeWise</strong> based on
                  feedback from users
                  like you. Whether it's new integrations, performance optimizations, or enhanced workflows, my goal is
                  to make <strong className="dark:text-white">WorktreeWise</strong> even more powerful.<br/><br/>

                  <strong className="dark:text-white">Thank you</strong> for joining me on this journey. I’m excited to see
                  how <strong className="dark:text-white">WorktreeWise</strong> can help you level up
                  your development process!
                </p>

              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div
                      className={`relative mb-4 sm:mb-8 sm:h-[400px] md:h-[540px] lg:h-[400px] xl:h-[500px] `}
                  >
                    <Image
                        src="/images/about/about1.avif"
                        alt="about image"
                        fill
                        className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div className="relative mb-4 sm:mb-8 sm:h-[220px] md:h-[346px] lg:mb-4 lg:h-[225px] xl:mb-8 xl:h-[310px]">
                    <Image
                      src="/images/about/about2.avif"
                      alt="about image"
                      fill
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="relative z-10 mb-4 flex items-center justify-center overflow-hidden bg-primary px-6 py-12 sm:mb-8 sm:h-[160px] sm:p-5 lg:mb-4 xl:mb-8">
                    <div>
                      <Image
                          src="/images/about/about3.avif"
                          alt="about image"
                          fill
                          className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
