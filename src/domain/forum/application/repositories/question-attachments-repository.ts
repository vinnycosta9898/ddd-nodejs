import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export interface QuestionAttachmentsRepository {
  deleteManyByquestionId(questionId: string): Promise<void>
  findManyByQuestionID(questionId: string): Promise<QuestionAttachment[]>
}
