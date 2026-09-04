export type CommandSnippet = {
  label: string;
  code: string;
  explanation?: string;
};

export type TutorialStep = {
  title: string;
  description: string;
  command?: string;
  output?: string;
  tip?: string;
};

export type EdgeCase = {
  title: string;
  description: string;
  command?: string;
};

export type Pitfall = {
  mistake: string;
  consequence: string;
  solution: string;
  fix?: string;
};

export type ComparisonTable = {
  headers: [string, string, string];
  rows: Array<[string, string, string]>;
};

export type ArticleContent = {
  slug: string;
  title: string;
  keyword: string;
  tags: string[];
  readTime: string;
  updatedDate: string;
  tldr: string;
  scenario: string;
  lead: string;
  problem: {
    title: string;
    description: string;
    errorSnippet?: string;
    internals: string;
  };
  commands: CommandSnippet[];
  steps: TutorialStep[];
  edgeCases?: EdgeCase[];
  comparisonTable?: ComparisonTable;
  pitfalls: Pitfall[];
  checks: string[];
  proTips: string[];
  keyTakeaways: string[];
  image?: string;
  imageAlt?: string;
};
