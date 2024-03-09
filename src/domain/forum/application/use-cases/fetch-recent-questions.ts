import { Question } from "../../enterprise/entities/question"
import { QuestionRepository } from "../repositories/question-repository"

interface FetchRecentQuestionUseCaseRequest{
  page: number
}

interface FetchRecentQuestionUseCaseResponse{
  question: Question[]
}

export class FetchRecentQuestionUseCase{
  constructor(private questionRepository: QuestionRepository){}

  async execute({
    page
  }: FetchRecentQuestionUseCaseRequest) : Promise<FetchRecentQuestionUseCaseResponse>{
    const question = await this.questionRepository.findManyRecent({ page })

    if(!question){
      throw new Error('Question not found')
    }

    return {
      question
    }
  } 
}