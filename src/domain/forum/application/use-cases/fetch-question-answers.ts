import { Answer } from "../../enterprise/entities/answer"
import { AnswerRepository } from "../answers-repository"

interface FetchQuestionAnswerUseCaseRequest{
  questionId: string
  page: number
}

interface FetchQuestionAnswerUseCaseResponse{
  answer: Answer[]
}

export class FetchQuestionAnswerUseCase{
  constructor(private answerRepository: AnswerRepository){}

  async execute({
    questionId,
    page
  }: FetchQuestionAnswerUseCaseRequest) : Promise<FetchQuestionAnswerUseCaseResponse>{
    const answer = await this.answerRepository.findManyByQuestionId(questionId, { page })

    if(!answer){
      throw new Error('Question not found')
    }

    return {
      answer
    }
  } 
}