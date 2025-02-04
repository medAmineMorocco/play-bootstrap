import Accordion from "@/components/Accordion/Accordion";
import Video from "@/components/Video/Video";
import { ClockCircleOutlined } from "@ant-design/icons";

const tutorials = {
  'Add Git Worktree': [
    {
      'title': 'Add Git Worktree From Head',
      'description': 'In this video, we\'ll guide you through adding a Git worktree directly from the current commit in the HEAD of your repository using WorktreeWise. This feature allows you to quickly branch out from the latest changes without affecting your main directory. Streamline your workflow and efficiently manage multiple tasks with ease.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Add Git Worktree From Existing Branch',
      'description': 'In this video, we\'ll guide you through adding a Git worktree from an existing branch using WorktreeWise. This feature lets you create a new worktree based on any existing branch in your repository. Manage multiple tasks effortlessly without switching contexts or disrupting your current workflow.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Add Git Worktree From Tag',
      'description': 'In this video, we\'ll guide you through adding a Git worktree from a tag using WorktreeWise. This feature allows you to create a new worktree based on any specific tag in your repository. Effortlessly work on different versions of your project without altering your main working directory.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Add Git Worktree With Hooks',
      'description': 'In this video, we\'ll guide you through adding a Git worktree with hooks using WorktreeWise. This feature allows you to automatically run predefined commands before or after creating a worktree. Streamline your workflow and ensure custom setups are applied every time you create a new worktree.',
      'url': 'https://youtu.be/4Crum6seBl8',
      'duration': '02:03',
    },
  ],
  'Manage Git Worktrees': [
    {
      'title': 'Change Location of a Git Worktree',
      'description': 'In this video, we\'ll guide you through changing the location of a Git worktree using WorktreeWise. This feature allows you to easily move your worktree to a different directory without disrupting your workflow. Keep your project organized and optimize your workspace with minimal effort.',
      'url': 'https://youtu.be/Pi0ZIggAaRY',
      'duration': '01:42',
    },
    {
      'title': 'Delete, Lock, Unlock and Rename Git Worktree',
      'description': 'In this video, we\'ll guide you through deleting, locking, unlocking, and renaming a Git worktree using WorktreeWise. Deleting a worktree allows you to remove it from your project, either keeping or removing the associated branch. Locking a worktree prevents any changes to it, while unlocking allows you to resume working. Renaming a worktree also renames the associated branch, helping you keep your workspace organized. With these features, you can efficiently manage your worktrees and maintain a smooth workflow.',
      'url': 'https://youtu.be/vlkgdk131qk',
      'duration': '02:16',
    },
  ],
  'Open Git Worktree in Terminal': [
    {
      'title': 'Setting up shell in WorktreeWise',
      'description': 'In this video, we\'ll guide you through setting up the shell in WorktreeWise. This feature allows you to configure and customize your terminal environment for seamless Git operations. Streamline your workflow by integrating your preferred shell for a more efficient development experience.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Open Git Worktree in Terminal',
      'description': 'In this video, we\'ll guide you through opening a Git worktree in the terminal using WorktreeWise. This feature allows you to quickly access and manage your worktree directly from the command line. Enhance your workflow by seamlessly working with your Git repositories in the terminal.',
      'url': 'https://youtu.be/BbERg9Ky8MM',
      'duration': '01:20',
    },
  ],
  'Open Git Worktree in your Favourite Editor': [
    {
      'title': 'Setting Up Editor in WorktreeWise',
      'description': 'In this video, we\'ll guide you through setting up your preferred editor in WorktreeWise. This feature allows you to integrate and configure your IDE or text editor for smooth worktree management. Customize your development environment to streamline your workflow and boost productivity.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Open Git Worktree in Editor',
      'description': 'In this video, we\'ll guide you through opening a Git worktree in your editor using WorktreeWise. This feature allows you to seamlessly open and work on your worktree in your preferred IDE or text editor. Enhance your development workflow by quickly accessing your worktree with all your settings intact.',
      'url': 'https://youtu.be/Uh5kbM9eFH4',
      'duration': '01:31',
    },
  ],
  'Git Tools': [
    {
      'title': 'Git Diff Between Two Git Worktrees',
      'description': 'In this video, we\'ll guide you through comparing two Git worktrees using Git Diff in WorktreeWise. This feature allows you to easily view the differences between two worktrees, helping you track changes and ensure consistency across your projects. Streamline your workflow by efficiently managing and comparing multiple worktrees.',
      'url': 'https://youtu.be/UNI35UwR1y4',
      'duration': '01:45',
    },
    {
      'title': 'Git Log',
      'description': 'In this video, we\'ll guide you through viewing the Git log in WorktreeWise. This feature allows you to explore the commit history of your worktree, providing valuable insights into changes and version control. Easily track your project\'s progress and review commit details to stay organized.',
      'url': 'https://youtu.be/Ry2E_xeWW8E',
      'duration': '00:42',
    },
  ],
  'Workflows': [
    {
      'title': 'Create & Run a Workflow on a Git Worktree',
      'description': 'In this video, we\'ll guide you through creating and running a workflow on a Git worktree using WorktreeWise. This feature allows you to automate tasks and run a series of commands on your worktree with ease. Streamline your development process by executing workflows efficiently across multiple worktrees.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Run Workflow Sequentially or in Parallel',
      'description': 'In this video, we\'ll guide you through running a workflow sequentially or in parallel using WorktreeWise. This feature lets you execute tasks across multiple worktrees, either one after another or simultaneously. Optimize your workflow and improve efficiency by customizing how your tasks are executed.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Edit, Delete and Duplicate a Workflow',
      'description': 'In this video, we\'ll guide you through editing, deleting, and duplicating a workflow in WorktreeWise. This feature allows you to easily modify existing workflows, remove unnecessary ones, or create duplicates for reuse. Streamline your workflow management and maintain flexibility in your development process.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Import Existing Workflows',
      'description': 'In this video, we\'ll guide you through importing existing workflows into WorktreeWise. This feature allows you to bring workflows from other repositories, saving time and ensuring consistency across projects. Simplify your workflow setup and quickly integrate pre-defined processes into your worktree environment.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
  ],
  'Code Generator': [
    {
      'title': 'Create & Run a Code Generator on a Git Worktree',
      'description': 'In this video, we\'ll guide you through creating and running a code generator on a Git worktree using WorktreeWise. This feature lets you automate the generation of files within your worktree, based on specified parameters. Streamline your development process by quickly generating code and ensuring consistency across your projects.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Edit, Duplicate and Delete a Code Generator',
      'description': 'In this video, we\'ll guide you through editing, duplicating, and deleting a code generator in WorktreeWise. This feature allows you to modify existing generators, create duplicates for reuse, or remove those no longer needed. Simplify your workflow by managing your code generators efficiently and maintaining flexibility in your development process.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Import Existing Code Generators',
      'description': 'In this video, we\'ll guide you through importing existing code generators into WorktreeWise. This feature allows you to bring in code generators from other repositories, saving time and ensuring consistency across projects. Quickly integrate pre-defined generators into your workflow to streamline your development process.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Inject Code Generator',
      'description': 'In this video, we\'ll guide you through injecting a code generator into a Git worktree using WorktreeWise. This feature allows you to seamlessly integrate and run code generators within your worktree environment. Enhance your development process by automating code generation directly in your workflow.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
  ],
  'Preferences': [
    {
      'title': 'Light & Dark Mode',
      'description': 'In this video, explore how to switch between light and dark modes in WorktreeWise to match your preferences or work environment. We’ll demonstrate how to toggle between the two modes using our user-friendly interface, helping you to customize your visual experience for optimal comfort.',
      'url': 'https://youtu.be/zKOufZBIYHU',
      'duration': '00:58',
    },
    {
      'title': 'Shortcuts',
      'description': 'In this video, discover the essential keyboard shortcuts available in WorktreeWise to streamline your workflow. We’ll walk you through a range of shortcuts that help you navigate, manage, and interact with your Git worktrees more efficiently. Learn how to quickly access features, switch between tabs, and perform common actions using keyboard shortcuts. This video will enhance your productivity by making it easier to use WorktreeWise and accelerate your development tasks.',
      'url': 'https://youtu.be/uWHp0CimnuE',
      'duration': '01:02',
    },
  ],
}

const Tutorials = () => {
  return (
    <section
      id="tutorials"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[40px]"
    >
      <div className="container pb-[70px]">
        <p className="leading-snug">
          In this section, you will find a collection of explainer videos designed to guide you through the core features
          of WorktreeWise. These videos provide step-by-step instructions on how to manage worktrees, create workflows, set up hooks, integrate with editors, and much
          more.<br /><br />

          WorktreeWise is built to streamline your Git workflow by allowing you to efficiently manage multiple
          worktrees, automate repetitive tasks, and ensure a smooth development experience. Each video is focused on a
          specific part of the software, helping you get the most out of WorktreeWise. <br /><br />

          Feel free to explore the videos below, and refer back to this page whenever you need a refresher or deeper
          insight into any feature!
        </p>
      </div>
      <div className="container blog-details">
        {Object.entries(tutorials).map(([category, items], categoryIndex) => (
            <Accordion key={category} preTitle={'0' + (categoryIndex + 1)} title={category}>
              {items.map((item, index) => (
                  <div key={index} className="flex gap-4 mt-8 flex-col sm:flex-row">
                    <div className="flex-grow-2 sm:w-0 sm:pr-4">
                      <h1 className="h-auto mb-10 md:mb-4 !text-[32px]">{item.title}</h1>
                      <small className="text-black font-semibold dark:text-white"><ClockCircleOutlined /> Duration: {item.duration}</small><br />
                      <span className="">{item.description}</span>
                    </div>
                    <div className="flex-grow order-last sm:w-0 sm:order-first">
                    <Video url={item.url} />
                    </div>
                  </div>
              ))}
            </Accordion>
        ))}
      </div>
    </section>
  );
};

export default Tutorials;
