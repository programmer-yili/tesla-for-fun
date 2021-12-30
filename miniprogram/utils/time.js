export const formatDate = (date) => {
  const mounth = date.getMonth() + 1
  return `${mounth}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
}