import { QuestionRepository } from '../question-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse{

}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionRepository) {}
  async execute({
    authorId,
    questionId
  }: DeleteQuestionUseCaseRequest) : Promise<DeleteQuestionUseCaseResponse> {

    const question = await this.questionsRepository.findById(questionId)

    if(!question){
      throw new Error("Question not found")
    }

    if(authorId !== question.authorId.toString()){
      throw new Error("Not allowed")
    }

    await this.questionsRepository.delete(question)

    return{
      question
    }
  }
}
