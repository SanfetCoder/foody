import { KITCHEN_STATUS } from "@/enums/history.enum"

export type History = {
  id : string,
  menuId : string,
  createdAt : Date,
  amount : number,
  restaurantId : string,
  orderId : string,
  status : KITCHEN_STATUS
}