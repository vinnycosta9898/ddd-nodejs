import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { AnswerRepository } from '../answers-repository'
import { QuestionRepository } from '../question-repository'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse{
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionRepository) {}
  async execute({
    authorId,
    title,
    content
  }: CreateQuestionUseCaseRequest) : Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content
    })

    await this.questionsRepository.create(question)

    return{
      question
    }
  }
}
