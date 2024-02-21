import { QuestionRepository } from "@/domain/forum/application/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionRepository{
  public items: Question[] = []

  async create(question: Question){
    this.items.push(question)
  }

  async findBySlug(slug: string){
      const question = this.items.find((item) => item.slug.value === slug)

      if(!question){
        return null
      }

      return question
  }
}