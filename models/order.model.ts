export type Order = {
  id : string
  restaurantId : string
  tableNo : string
  createdAt : Date
  updatedAt : Date
  totalPrice : number,
  status : string
}