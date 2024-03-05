import { Question } from '../enterprise/entities/question'

export interface QuestionRepository {
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findById(slug:string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
}
