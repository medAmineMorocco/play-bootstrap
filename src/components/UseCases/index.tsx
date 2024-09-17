import SectionTitle from "../Common/SectionTitle";
import SingleUseCase from "./SingleUseCase";
import useCasesData from "./useCasesData";

const UseCases = () => {
  return (
    <section className="pb-8 pt-20 dark:bg-dark lg:pt-[80px]">
      <div className="container">
        <SectionTitle
          subtitle="Use Cases"
          title="Git Worktree Use Cases"
          paragraph="See How WorktreeWise Transforms Teamwork with Real-World Git Worktree Use Cases."
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
