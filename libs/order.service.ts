import { supabase } from "@/configs/supabaseClient.config";
import { Order } from "@/models/order.model";

export async function fetchOrders(restaurantId: string): Promise<Order[]> {
  try {
    if (!restaurantId) {
      throw new Error("Please provide a restaurant ID");
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("restaurantId", restaurantId);

    if (error) {
      throw new Error(error.message);
    }

    return data as Order[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchOrder(orderId: string): Promise<Order> {
  try {
    if (!orderId) {
      throw new Error("Please provide an order ID");
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Order;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createOrder(order: Order): Promise<Order> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert(order)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Order;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
