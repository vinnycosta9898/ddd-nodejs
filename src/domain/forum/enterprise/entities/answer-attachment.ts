import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface AnswerAttachmentProps{
  answerId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps>{
  get title(){
    return this.props.title
  }

  get attachmentId(){
    return this.props.link
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityId){
    const answerAttachment = new AnswerAttachment(props, id)

    return answerAttachment
  }
}