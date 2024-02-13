import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseRequest {
  instructorId: String;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer(content);

    return answer;
  }
}

new AnswerQuestionUseCase().execute({
  questionId: "1",
  instructorId: "2",
});
