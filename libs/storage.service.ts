import { supabase } from "@/configs/supabaseClient.config";

export async function uploadImage(bucketName : string, path: string, imageFile: File) {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(path, imageFile);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
