import { AnswerRepository } from "../repositories/answers-repository"

interface EditQAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditQAnswerUseCaseResponse{}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}
  async execute({
    authorId,
    answerId,
    content
  }: EditQAnswerUseCaseRequest) : Promise<EditQAnswerUseCaseResponse> {

    const answer = await this.answersRepository.findById(answerId)

    if(!answer){
      throw new Error("QAnswer not found")
    }

    if(authorId !== answer.authorId.toString()){
      throw new Error("Not allowed")
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return{
      
    }
  }
}
