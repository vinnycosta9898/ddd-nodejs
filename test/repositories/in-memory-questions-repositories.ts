import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionRepository{
  public items: Question[] = []

  async create(question: Question){
    this.items.push(question)
  }

  async save(question: Question){
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

      if(!question){
        return null
      }

      return question
  }

  async findBySlug(slug: string){
      const question = this.items.find((item) => item.slug.value === slug)

      if(!question){
        return null
      }

      return question
  }

  async findManyRecent({ page } : PaginationParams){
    const questions = this.items.sort((a, b) => b.createdAt.getTime - a.createdAt.getTime()).slice((page - 1) * 20, page * 20)

    return questions
  }
}