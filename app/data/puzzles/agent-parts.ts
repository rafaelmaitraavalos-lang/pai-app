import type { Puzzle } from '../../components/ConnectionsGame'

const puzzle: Puzzle = {
  id: 'agent-parts',
  title: 'Agent Parts',
  groups: [
    {
      name: 'MEMORY',
      difficulty: 1,
      cards: ['Context window holding the current conversation', 'External database the agent can query', 'Summary of past sessions passed in at the start', 'Notes the agent writes to itself mid-task'],
      reveal: 'Memory determines what the agent knows and for how long. Context window memory is fast but limited and disappears when the session ends. External memory persists but requires retrieval. The design of ',
    },
    {
      name: 'TOOLS',
      difficulty: 2,
      cards: ['Web search function the agent can call', 'Code interpreter for running calculations', 'API connection to an external service', 'File system access for reading and writing documents'],
      reveal: 'Tools are what let an agent act on the world instead of just talking about it. Without tools, an agent is just a chatbot. With the right tools, it can search, calculate, connect to services, and modif',
    },
    {
      name: 'PLANNING',
      difficulty: 3,
      cards: ['Breaking a goal into subtasks', 'Deciding which tool to use for which step', 'Checking whether a previous step succeeded before continuing', 'Revising the plan when a step fails'],
      reveal: 'Planning turns a high-level goal into a sequence of actions. Without planning, an agent can only respond to what\'s immediately in front of it. With planning, it can work toward something over time.',
    },
    {
      name: 'EXECUTION GUARDRAILS',
      difficulty: 4,
      cards: ['Requiring human approval before irreversible actions', 'Logging every action taken for review', 'Hard limits on which tools can be used in which contexts', 'Automatic rollback if a step produces unexpected results'],
      reveal: 'Guardrails are what make agents safe to deploy. An agent without guardrails can take irreversible actions — send emails, modify files, make purchases — based on misunderstanding a request. The more po',
    },
  ],
}

export default puzzle
