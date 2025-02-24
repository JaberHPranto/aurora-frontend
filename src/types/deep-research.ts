interface BaseMessage {
  type: string;
  value: unknown;
}

interface RewriteMessage extends BaseMessage {
  type: "rewrite";
  value: {
    rewritten_query: string;
  };
}

interface ThinkMessage extends BaseMessage {
  type: "think";
  value: {
    id: number;
    thought: string;
  };
}

interface ResearchMessage extends BaseMessage {
  type: "research";
  value: {
    id: number;
    research_question: string;
    research_result: string;
  };
}

interface CompletedResearchMessage extends BaseMessage {
  type: "completed_research";
  value: {
    reason: string;
  };
}

interface FinalMessage extends BaseMessage {
  type: "final";
  value: {
    final_answer: string;
  };
}

export type DeepResearchMessage =
  | RewriteMessage
  | ThinkMessage
  | ResearchMessage
  | CompletedResearchMessage
  | FinalMessage;
