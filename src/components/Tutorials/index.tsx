import Accordion from "@/components/Accordion/Accordion";

const tutorials = {
  'Add Git Worktree': [
    {
      'title': 'Add Git Worktree From Head',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Add Git Worktree From Existing Branch',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Add Git Worktree From Tag',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Add Git Worktree With Hooks',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
  ],
  'Manage Git Worktrees': [
    {
      'title': 'Change Location of a Git Worktree',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Delete, Lock, Unlock and Rename Git Worktree',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
  ],
  'Open Git Worktree in Terminal': [
    {
      'title': 'Setting up shell in WorktreeWise',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Open Git Worktree in Terminal',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
  ],
  'Open Git Worktree in your Favourite Editor': [
    {
      'title': 'Setting Up Editor in WorktreeWise',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Open Git Worktree in Editor',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
  ],
  'Git Tools': [
    {
      'title': 'Git Diff Between Two Git Worktrees',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Git Log',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
  ],
  'Workflows': [
    {
      'title': 'Create & Run a Workflow on a Git Worktree',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Run Workflow Sequentially or in Parallel Across Selected or All Git Worktrees',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Edit, Delete and Duplicate a Workflow',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Import Existing Workflows',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
  ],
  'Code Generator': [
    {
      'title': 'Create & Run a Code Generator on a Git Worktree',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Edit, Duplicate and Delete a Code Generator',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Import Existing Code Generators',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Inject Code Generator',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
  ],
  'Preferences': [
    {
      'title': 'Light & Dark Mode',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Shortcuts',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
  ],
}

const Tutorials = () => {
  return (
    <section
      id="tutorials"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container blog-details">
        {Object.entries(tutorials).map(([category, items], categoryIndex) => (
            <Accordion key={category} preTitle={'0' + (categoryIndex + 1)} title={category}>
              {items.map((item, index) => (
                  <div key={index} className="flex gap-4 mt-8 flex-col sm:flex-row">
                    <div className="flex-grow-2 sm:w-0 sm:pr-4">
                      <h1 className="h-[40px] !mb-6 !text-[32px]">{item.title}</h1>
                      <span>{item.description}</span>
                    </div>
                    <div className="flex-grow order-last sm:w-0 sm:order-first">
                      <iframe height="300" width="100%" title={item.title} allowFullScreen={true}
                              src={item.url}></iframe>
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
