import { randomUUID } from "node:crypto";
import { Slug } from "./value-objects/slug";

interface QuestionProps {
  slug: Slug
  title: string;
  content: string;
  authorId: string;
}

class Question {
  public id: string;
  public slug: Slug;
  public title: string;
  public content: string;
  public authorId: string;

  constructor(props: QuestionProps, id?: string) {
    this.id = id ?? randomUUID();
    this.slug = props.slug
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
  }
}
