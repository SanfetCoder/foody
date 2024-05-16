import { supabase } from "@/configs/supabaseClient.config";
import { Restaurant } from "@/models/restaurant.model";

export async function createRestaurant(restaurantInfo: any) {
  try {
    const { error } = await supabase.from("restaurants").insert(restaurantInfo);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
