import { supabase } from "@/configs/supabaseClient.config";
import { Menu } from "@/models/menu.model";

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

export async function fetchMenuCategories(restaurantId: string): Promise<string[]> {
  try {
    if (!restaurantId) {
      throw new Error("Please provide a restaurant ID");
    }

    const { data, error } = await supabase
      .from("menus")
      .select("category")
      .eq("restaurantId", restaurantId)

    if (error) {
      throw new Error(error.message);
    }

    return data.map((menu: any) => menu.category) as string[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchMenu(menuId: string): Promise<Menu> {
  try {
    if (!menuId) {
      throw new Error("Please provide a menu ID");
    }

    const { data, error } = await supabase
      .from("menus")
      .select("*")
      .eq("id", menuId);

    if (error) {
      throw new Error(error.message);
    }

    return data[0] as Menu;
  } catch (error: any) {
    throw new Error(error.message);
  }
}


export async function createMenu(restaurantId: string, menuDetail: any) : Promise<Menu> {
  try {
    if (!(restaurantId || menuDetail)) {
      throw new Error("Please fill in all fields");
    }
    
    const {data, error } = await supabase
      .from("menus")
      .insert({...menuDetail, restaurantId : restaurantId})
      .eq("restaurant_id", restaurantId)
      .select()
      .single()

    if (error) {
      throw new Error(error.message);
    }

    return data as Menu;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateMenu(menuId: string, menuDetail: any) {
  try {
    if (!(menuId || menuDetail)) {
      throw new Error("Please fill in all fields");
    }

    const { error } = await supabase
      .from("menus")
      .update(menuDetail)
      .eq("id", menuId);

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