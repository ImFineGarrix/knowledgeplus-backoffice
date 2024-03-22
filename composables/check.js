export const useCheck = () => {
  return {
    checkEmpty(items) {
      return !!items.length
    }
  }
}