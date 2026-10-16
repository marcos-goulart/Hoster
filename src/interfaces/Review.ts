export interface Review {
  id: string
  hotelId: string
  userName: string
  userAvatar?: string | null
  rating: number
  stayDate: string
  comment: string
  createdAt?: string
}
