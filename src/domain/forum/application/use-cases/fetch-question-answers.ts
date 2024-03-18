import { Either, rigth } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchQuestionAnswerUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswerUseCaseResponse = Either<ResourceNotFoundError, {answer: Answer[]}>

export class FetchQuestionAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    if (!answer) {
      throw new Error('Question not found')
    }

    return rigth({
      answer
    })
  }
}
