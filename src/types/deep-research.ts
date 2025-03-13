interface BaseMessage {
  type: string;
  value: unknown;
}

export interface RewriteMessage extends BaseMessage {
  type: "rewrite";
  value: {
    rewritten_query: string;
  };
}

export interface ThinkMessage extends BaseMessage {
  type: "think";
  value: {
    id: number;
    thought: string;
  };
}

export interface ResearchMessage extends BaseMessage {
  type: "research";
  value: {
    id: number;
    research_question: string;
    research_result: string;
  };
}

export interface CompletedResearchMessage extends BaseMessage {
  type: "completed_research";
  value: {
    reason: string;
  };
}

export interface FinalMessage extends BaseMessage {
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

export type DeepResearchGroup = Record<
  number,
  {
    think: (DeepResearchMessage & ThinkMessage) | null;
    research: (DeepResearchMessage & ResearchMessage) | null;
  }
>;

export interface ResearchParts {
  think?: string;
  question?: string;
  answer?: string;
}

export interface DeepResearchSection {
  type: "rewrite" | "research" | "final" | "unknown";
  content?: string;
  parts?: ResearchParts;
}
