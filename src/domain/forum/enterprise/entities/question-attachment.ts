import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface QuestionAttachmentProps{
  questionId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps>{
  get title(){
    return this.props.title
  }

  get attachmentId(){
    return this.props.link
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityId){
    const questionAttachment = new QuestionAttachment(props, id)

    return questionAttachment
  }
}