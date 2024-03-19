import { Either, left, rigth } from '@/core/either'
import { QuestionRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
import { Question } from '../../enterprise/entities/question'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}
  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachment = await this.questionAttachmentsRepository.findManyByQuestionID(questionId)

    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachment)

    const questionAttachments = attachmentsIds.map((attachmanetId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmanetId),
        questionId: question.id
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionsRepository.save(question)

    return rigth({
      question,
    })
  }
}
