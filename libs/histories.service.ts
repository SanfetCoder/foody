import { supabase } from "@/configs/supabaseClient.config";
import { History } from "@/models/history.model";

export async function getHistories(orderId : string) {
 try {
  const { data, error } = await supabase
  .from('histories')
  .select('*')
  .eq('orderId', orderId)

  if (error) {
   throw new Error(error.message);
  }

  return data as History[];

 } catch (error : any) {
  throw new Error(error.message);
 }
}

export async function createHistories(histories : History[]) {
 try {
  const { data, error } = await supabase
  .from('histories')
  .insert(histories)
  .select('*')

  if (error) {
   throw new Error(error.message);
  }

  return data as History[];

 } catch (error : any) {
  throw new Error(error.message);
 }
}