import { AnswerRepository } from "@/domain/forum/application/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository{
  public items: Answer[] = []

  async create(answer: Answer){
    this.items.push(answer)
  }
}