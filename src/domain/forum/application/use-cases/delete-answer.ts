import { Either, left, rigth } from '@/core/either'
import { AnswerRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse  = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return rigth(new NotAllowedError())
    }

    await this.answerRepository.delete(answer)

    return rigth({
      answer
    })
  }
}
