import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-coment'

export interface QuestionCommentsRepository {
  create(question: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
  findById(idL: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
}
