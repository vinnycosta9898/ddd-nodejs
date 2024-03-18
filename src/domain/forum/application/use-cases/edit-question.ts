import { Either, left, rigth } from '@/core/either'
import { QuestionRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
import { Question } from '../../enterprise/entities/question'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {question: Question}>

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionRepository) {}
  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return rigth({
      question
    })
  }
}
