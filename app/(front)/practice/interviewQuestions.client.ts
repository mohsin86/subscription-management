export type InterviewQuestion = {
  id: string;
  category: string;
  section: string | null;
  question: string;
  answer: string;
  codeSnippet: string | null;
  order: number;
};

export type InterviewQuestionEditData = {
  question: string;
  answer: string;
  codeSnippet?: string;
};

export type InterviewQuestionCreateData = InterviewQuestionEditData & {
  category: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error ?? "Something went wrong.");
  }
  return json as T;
}

/**
 * fetchInterviewQuestions — gets all questions for a category.
 * Args: category (string). Returns: Promise<InterviewQuestion[]>
 */
export async function fetchInterviewQuestions(category: string) {
  const res = await fetch(`/api/interview-questions?category=${encodeURIComponent(category)}`);
  return handleResponse<InterviewQuestion[]>(res);
}

/**
 * createInterviewQuestion — adds a new question to a category.
 * Args: data (InterviewQuestionCreateData). Returns: Promise<InterviewQuestion>
 */
export async function createInterviewQuestion(data: InterviewQuestionCreateData) {
  const res = await fetch(`/api/interview-questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<InterviewQuestion>(res);
}

/**
 * updateInterviewQuestion — updates an existing question's content.
 * Args: id (string), data (InterviewQuestionEditData). Returns: Promise<InterviewQuestion>
 */
export async function updateInterviewQuestion(id: string, data: InterviewQuestionEditData) {
  const res = await fetch(`/api/interview-questions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<InterviewQuestion>(res);
}

/**
 * deleteInterviewQuestion — deletes a question by id.
 * Args: id (string). Returns: Promise<{ success: true }>
 */
export async function deleteInterviewQuestion(id: string) {
  const res = await fetch(`/api/interview-questions/${id}`, {
    method: "DELETE",
  });
  return handleResponse<{ success: true }>(res);
}
