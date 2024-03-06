import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repositories";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { FetchRecentQuestionUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionUseCase

describe('Fetch recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2024, 0, 20)}))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2024, 0, 22)}))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2024, 0, 24)}))

    const { question } = await sut.execute({
      page: 1
    })

    expect(question).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 22) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 24) })
    ])

  })
})
