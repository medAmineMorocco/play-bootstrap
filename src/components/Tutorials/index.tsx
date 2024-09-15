import Accordion from "@/components/Accordion/Accordion";

const tutorials = {
  'Git Add Worktree': [
    {
      'title': 'Git Add Worktree From Head',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Git Add Worktree From Head',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
  ],
  'Integrations': [
    {
      'title': 'Git Add Worktree From Head',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur dicta dignissimos ducimus esse et fuga fugiat ipsum magni nihil non obcaecati qui quidem reprehenderit sunt ullam, vel voluptas.',
      'url': 'https://www.youtube.com/embed/tgbNymZ7vqY',
    },
    {
      'title': 'Git Add Worktree From Head',
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
                      <h3>{item.title}</h3>
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
