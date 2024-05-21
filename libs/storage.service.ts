import { supabase } from "@/configs/supabaseClient.config";
import { decode } from 'base64-arraybuffer'
import { v4 } from "uuid";

export async function uploadImage(
  bucketName: string,
  path: string,
  imageFile: File
) {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(path, imageFile, {
        upsert: true,
      });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function uploadBase64Url(bucketName: string, url: string, path: string) {
  try {

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(path, decode(url) , {
        upsert: true,
        contentType : "image/png",
      });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function getPublicUrl(bucketName: string, path: string) {
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${path}?random=${v4()}`);
  return data.publicUrl;
}
