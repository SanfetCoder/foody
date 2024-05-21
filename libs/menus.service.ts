import { supabase } from "@/configs/supabaseClient.config";
import { Menu, menuSamples } from "@/models/menu.model";

export async function fetchMenus(restaurantId: string): Promise<Menu[]> {
  try {
    if (!restaurantId) {
      throw new Error("Please provide a restaurant ID");
    }

    const { data, error } = await supabase
      .from("menus")
      .select("*")
      .eq("restaurantId", restaurantId);

    if (error) {
      throw new Error(error.message);
    }

    return data as Menu[];
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

export async function deleteMenu(menuId : string){
  try {
    if (!menuId) {
      throw new Error("Please provide a menu ID");
    }

    const { error } = await supabase
      .from("menus")
      .delete()
      .eq("id", menuId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error : any) {
    throw new Error(error.message)
  }
}