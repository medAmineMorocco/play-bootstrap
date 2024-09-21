import Accordion from "@/components/Accordion/Accordion";
import Video from "@/components/Video/Video";
import { ClockCircleOutlined } from "@ant-design/icons";

const tutorials = {
  'Add Git Worktree': [
    {
      'title': 'Add Git Worktree From Head',
      'description': 'In this video, we\'ll guide you through adding a new git worktree from the current HEAD using WorktreeWise. You\'ll learn how to utilize our intuitive interface to create git worktrees effortlessly. We’ll show you step-by-step how to use WorktreeWise to set up a git worktree from the HEAD of your repository, without the need for manual commands. Whether you\'re new to Git worktrees or just looking for a more efficient way to handle them, this video will help you understand and apply this feature seamlessly.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Add Git Worktree From Existing Branch',
      'description': 'In this video, discover how to add a Git worktree from an existing branch using the WorktreeWise interface. Skip the need for manual commands like git worktree add and instead use our streamlined UI to quickly create and manage worktrees. We’ll walk you through selecting an existing branch and setting up your worktree in just a few clicks. Whether you’re managing multiple branches or working on different features, this video makes it easy to handle your Git worktrees.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Add Git Worktree From Tag',
      'description': 'In this video, learn how to add a Git worktree from a specific tag using WorktreeWise. With our user-friendly interface, there’s no need for commands like git worktree add. Instead, you can easily select a tag and create a worktree directly from it. This video walks you through the process step-by-step, making it simple to manage your Git worktrees from any tag in your repository. Whether you’re reviewing past versions or working on a specific release, this guide will help you do it effortlessly.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Add Git Worktree With Hooks',
      'description': 'In this video, you\'ll learn how to create a Git worktree with pre- and post-hooks using the WorktreeWise interface. We\'ll guide you through setting up custom hooks that run specific commands before and after the worktree creation process—all without needing to write commands yourself. By the end of this video, you\'ll understand how to automate tasks during worktree setup, enhancing your development workflow. This is an essential guide for anyone looking to fully utilize Git worktrees with hooks for maximum efficiency.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
  ],
  'Manage Git Worktrees': [
    {
      'title': 'Change Location of a Git Worktree',
      'description': 'In this video, we\'ll show you how to easily change the location of an existing Git worktree using the WorktreeWise interface. No need to manually move folders or run commands—simply use our intuitive UI to relocate your worktree to a new directory. This video covers how to manage your worktrees efficiently, whether you\'re organizing projects or freeing up space. Follow along to see how simple it is to adjust worktree locations with WorktreeWise.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Delete, Lock, Unlock and Rename Git Worktree',
      'description': 'In this video, learn how to manage your Git worktrees effortlessly using WorktreeWise. We’ll guide you through deleting, locking, unlocking, and renaming Git worktrees—all through our easy-to-use interface. You’ll see how to perform these actions without typing commands, making it simple to control your git worktrees. Whether you\'re cleaning up your workspace, securing git worktrees from accidental changes, or renaming them for better organization, this video covers everything you need to know.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
  ],
  'Open Git Worktree in Terminal': [
    {
      'title': 'Setting up shell in WorktreeWise',
      'description': 'In this video, we’ll walk you through configuring your preferred shell in WorktreeWise. Learn how to set up your terminal environment with just a few clicks—no need for complex configurations. Whether you\'re working with Bash, Zsh, or another shell, our intuitive interface makes it easy to launch worktrees directly into the terminal of your choice. This video will help you streamline your workflow and get the most out of WorktreeWise’s shell integration features.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Open Git Worktree in Terminal',
      'description': 'In this video, we\'ll show you how to open a Git worktree directly in the built-in terminal of WorktreeWise. Skip the hassle of external terminal commands and manage your worktrees efficiently within the app.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
  ],
  'Open Git Worktree in your Favourite Editor': [
    {
      'title': 'Setting Up Editor in WorktreeWise',
      'description': 'In this video, learn how to configure your preferred code editor in WorktreeWise. We’ll guide you through the process of setting up popular editors like WebStorm or VS Code, so you can open your Git worktrees directly in your favorite development environment. We’ll also cover how to ensure the editor path is correctly set up in WorktreeWise and provide examples for each operating system. This video simplifies the process, ensuring you can quickly switch between worktrees and maintain your development flow.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Open Git Worktree in Editor',
      'description': 'In this video, discover how to open a Git worktree directly in your preferred code editor using WorktreeWise. We’ll demonstrate how to seamlessly integrate your editor with WorktreeWise, allowing you to access and work on your Git worktrees without leaving the application. Whether you use WebStorm, VS Code, or another editor, you’ll learn how to set up and open worktrees with just a few clicks. This video makes managing your development environment easier and more efficient.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
  ],
  'Git Tools': [
    {
      'title': 'Git Diff Between Two Git Worktrees',
      'description': 'In this video, we’ll show you how to compare changes between two Git worktrees using WorktreeWise. Learn how to use our intuitive interface to view git diff results between different worktrees, making it easier to identify differences and track changes across your projects. This video will guide you through the process of selecting and comparing worktrees, helping you manage and review your code more effectively. Whether you’re debugging or reviewing code, this feature will streamline your workflow.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Git Log',
      'description': 'In this video, we’ll explore how to view and navigate the Git log within WorktreeWise. Learn how to use our built-in tools to access and analyze the commit history of your Git worktrees effortlessly.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
  ],
  'Workflows': [
    {
      'title': 'Create & Run a Workflow on a Git Worktree',
      'description': 'In this video, learn how to create and execute workflows on your Git worktrees using WorktreeWise. We’ll walk you through the process of setting up a new workflow, defining tasks, and running it on your selected worktree through our user-friendly interface. Discover how to automate repetitive tasks, streamline your development process, and enhance productivity by leveraging workflows within WorktreeWise. This video will guide you step-by-step in creating and managing workflows efficiently, making complex operations simple and accessible.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Run Workflow Sequentially or in Parallel',
      'description': 'In this video, we’ll show you how to execute workflows either sequentially or in parallel across multiple Git worktrees using WorktreeWise. Learn how to select specific worktrees or apply workflows to all worktrees at once, optimizing your development process. We’ll demonstrate how to configure and run workflows efficiently, whether you need to process tasks one after another or simultaneously across different branches. This video will help you enhance productivity by leveraging WorktreeWise’s powerful workflow management features.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Edit, Delete and Duplicate a Workflow',
      'description': 'In this video, learn how to manage your workflows in WorktreeWise by editing, deleting, and duplicating them. We’ll guide you through the process of modifying existing workflows to fit your evolving needs, removing workflows you no longer require, and creating duplicates for new variations. Using our intuitive interface, you can efficiently handle your workflows, ensuring they align with your project requirements and streamline your development tasks. This video will help you master workflow management, making it easy to keep your work organized and productive.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Import Existing Workflows',
      'description': 'In this video, discover how to import existing workflows into WorktreeWise. We’ll walk you through the process of bringing workflows from other repositories into your WorktreeWise environment, allowing you to leverage pre-defined tasks and automation. Learn how to seamlessly integrate these workflows into your current setup, ensuring a smooth transition and efficient utilization of your existing processes. This video will help you enhance your productivity by importing and adapting workflows, making it easier to manage and execute complex tasks.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
  ],
  'Code Generator': [
    {
      'title': 'Create & Run a Code Generator on a Git Worktree',
      'description': 'In this video, we’ll guide you through the process of creating and running a code generator on a Git worktree using WorktreeWise. Learn how to set up a new code generator, specify parameters, and execute it within your worktree. We’ll walk you through each step of configuring the generator, from defining input parameters to selecting the target worktree. This video will help you streamline your development workflow by automating code creation and ensuring consistency across your projects.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Edit, Duplicate and Delete a Code Generator',
      'description': 'In this video, learn how to efficiently manage your code generators in WorktreeWise. We’ll demonstrate how to edit existing code generators, create duplicates for new use cases, and delete those you no longer need. Using our intuitive interface, you can modify parameters, adjust configurations, and keep your code generation process streamlined and organized. This video will help you enhance your development workflow by managing your code generators effectively and adapting them to your evolving project requirements.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Import Existing Code Generators',
      'description': 'In this video, discover how to import existing code generators into WorktreeWise. We’ll guide you through the process of bringing in code generators from other projects or repositories, allowing you to reuse and adapt them in your current worktree. Learn how to seamlessly integrate these generators, configure them to fit your needs, and leverage their functionality without starting from scratch. This video will help you enhance your development efficiency by utilizing pre-defined code generators and incorporating them into your workflow.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Inject Code Generator',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
  ],
  'Preferences': [
    {
      'title': 'Light & Dark Mode',
      'description': 'In this video, explore how to switch between light and dark modes in WorktreeWise to match your preferences or work environment. We’ll demonstrate how to toggle between the two modes using our user-friendly interface, helping you to customize your visual experience for optimal comfort.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
    },
    {
      'title': 'Shortcuts',
      'description': 'In this video, discover the essential keyboard shortcuts available in WorktreeWise to streamline your workflow. We’ll walk you through a range of shortcuts that help you navigate, manage, and interact with your Git worktrees more efficiently. Learn how to quickly access features, switch between tabs, and perform common actions using keyboard shortcuts. This video will enhance your productivity by making it easier to use WorktreeWise and accelerate your development tasks.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
      'duration': '01:33',
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
                      <small className="text-white"><ClockCircleOutlined /> Duration: {item.duration}</small><br />
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
