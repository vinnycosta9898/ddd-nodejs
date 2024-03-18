import { Either, left, rigth } from "./either";

function doSomething(shouldSuccess: boolean): Either<string, number>{
  if(shouldSuccess){
    return rigth(10)
  }else{
    return left('error')
  }
}

test('Success result', () => {
  const result = doSomething(true)

  if(result.isRight()){
    console.log(result.value)
  }
  
  expect(result.isLeft()).toBe(false)
  expect(result.isRight()).toBe(true)
})

test('Error result', () => {
  const result = doSomething(true)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)

})