export const useClassNames = (classNames = []) => {
  return classNames.filter(Boolean).join(' ')
}
