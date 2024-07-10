import SectionTitle from "../Common/SectionTitle";
import SingleUseCase from "./SingleUseCase";
import useCasesData from "./useCasesData";

const UseCases = () => {
  return (
    <section className="pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle
          subtitle="Use Cases"
          title="Example Of Use Cases Of WorktreeWise"
          paragraph="Explore real-world use cases to see how WorktreeWise transforms teamwork."
        />

        <div className="-mx-4 mt-12 flex flex-wrap lg:mt-20">
          {useCasesData.map((feature, i) => (
            <SingleUseCase key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
