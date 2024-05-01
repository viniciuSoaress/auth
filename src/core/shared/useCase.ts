export default interface UseCase<E,S>{
  handle(data: E): Promise<S>
}