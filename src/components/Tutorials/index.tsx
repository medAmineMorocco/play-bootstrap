const videos = {
  'Worktrees': [
    'https://www.youtube.com/embed/tgbNymZ7vqY',
    'https://www.youtube.com/embed/tgbNymZ7vqY',
    'https://www.youtube.com/embed/tgbNymZ7vqY',
    'https://www.youtube.com/embed/tgbNymZ7vqY'
  ],
  'Integrations': [
    'https://www.youtube.com/embed/tgbNymZ7vqY',
    'https://www.youtube.com/embed/tgbNymZ7vqY',
    'https://www.youtube.com/embed/tgbNymZ7vqY',
  ],
  'Workflows': [
    'https://www.youtube.com/embed/tgbNymZ7vqY',
    'https://www.youtube.com/embed/tgbNymZ7vqY',
  ],
  'Git Tools': [
    'https://www.youtube.com/embed/tgbNymZ7vqY',
  ],
  'Code Generator': [
  ],
}

const Tutorials = () => {
  return (
    <section
      id="tutorials"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container blog-details">
        {
          Object.entries(videos).map(([key, values]) => {
            return <div key={key}>
              <h1>{key}</h1>
              <div class="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3">
                {values.map(value => <iframe key={new Date().getTime()} height="315" width="100%" src={value}>
                </iframe>)}
              </div>
            </div>
          })
        }
      </div>
    </section>
  );
};

export default Tutorials;
