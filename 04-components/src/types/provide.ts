export interface News {
  title: string
  id: number
  isOpen: boolean
  wasRead: boolean
}

export type TProvideNews = {
  title: string
  news: News[]
}
