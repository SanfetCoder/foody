import { supabase } from "@/configs/supabaseClient.config";
import { Menu, menuSamples } from "@/models/menu.model";

export async function fetchMenus(restaurantId: string): Promise<Menu[]> {
  try {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(menuSamples);
      }, 1000);
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createMenu(restaurantId: string, menuDetail: any) {
  try {
    if (!(restaurantId || menuDetail)) {
      throw new Error("Please fill in all fields");
    }
    
    const { error } = await supabase
      .from("menus")
      .insert({...menuDetail, restaurantId : restaurantId})
      .eq("restaurant_id", restaurantId);

    if (error) {
      throw new Error(error.message);
    }

  } catch (error: any) {
    throw new Error(error.message);
  }
}
