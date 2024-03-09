import { QuestionComment } from '../../enterprise/entities/question-coment'

export interface QuestionCommentsRepository {
  create(question: QuestionComment): Promise<void>
}
