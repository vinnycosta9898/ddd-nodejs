import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../answers-repository'
import { QuestionRepository } from '../question-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  answer: Answer
}


export class ChooseQuestionBestAnswerUseCase {
  constructor(private questionsRepository: QuestionRepository, private answersRepository: AnswerRepository) {}
  async execute({
    authorId,
    answerId
  }: ChooseQuestionBestAnswerUseCaseRequest) {
    const answer = await this.answersRepository.findById(answerId)

    if(!answer){
      throw new Error('Answer not found')
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if(!question){
      throw new Error('Question not found')
    }

    if(authorId !== question.authorId.toString()){
      throw new Error('Not allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return{
      question
    }


  }
}
