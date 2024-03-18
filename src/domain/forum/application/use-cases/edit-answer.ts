import { Either, left, rigth } from '@/core/either'
import { AnswerRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditQAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditQAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}
  async execute({
    authorId,
    answerId,
    content,
  }: EditQAnswerUseCaseRequest): Promise<EditQAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return rigth({})
  }
}
