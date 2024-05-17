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

export async function getRestaurant(id: string): Promise<Restaurant> {
  try {
    const { data, error } = await supabase
      .from("restaurants")
      .select()
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
