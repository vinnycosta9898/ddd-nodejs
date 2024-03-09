import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-coment";

export class InMemoryQuestionCommentRepository implements QuestionCommentsRepository{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment){
    this.items.push(questionComment)
  }

}