import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../question-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {},
}

test('create an answer', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'nova pergunta',
    content: 'Conteudo da pergunta',
  })

  expect(question.id).toBeTruthy()
})
