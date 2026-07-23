export type Topic = {
  id: string;
  slug: string;
  title: string;
  order: number;
  _count?: { questions: number };
};

export type InterviewTopicData = {
  title: string;
  slug: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error ?? "Something went wrong.");
  }
  return json as T;
}

/**
 * fetchInterviewTopics — gets all topics, ordered.
 * Returns: Promise<Topic[]>
 */
export async function fetchInterviewTopics() {
  const res = await fetch("/api/interview-topics");
  return handleResponse<Topic[]>(res);
}

/**
 * createTopic — adds a new topic, appended to the end of the list.
 * Args: data ({ title, slug }). Returns: Promise<Topic>
 */
export async function createTopic(data: InterviewTopicData) {
  const res = await fetch("/api/interview-topics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Topic>(res);
}

/**
 * updateTopic — updates an existing topic's title/slug.
 * Args: id (string), data ({ title, slug }). Returns: Promise<Topic>
 */
export async function updateTopic(id: string, data: InterviewTopicData) {
  const res = await fetch(`/api/interview-topics/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Topic>(res);
}

/**
 * deleteTopic — deletes a topic (and, via cascade, all its questions).
 * Args: id (string). Returns: Promise<{ success: true }>
 */
export async function deleteTopic(id: string) {
  const res = await fetch(`/api/interview-topics/${id}`, {
    method: "DELETE",
  });
  return handleResponse<{ success: true }>(res);
}
