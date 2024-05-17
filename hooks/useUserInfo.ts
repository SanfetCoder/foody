import { useUser } from './useUser';
import { useQuery } from '@tanstack/react-query';
import { getRestaurant } from '@/libs/restaurants.service';

export const useUserInfo = () => {
  const { user } = useUser();

  const { data: userInfo, isLoading, error } = useQuery({
    queryKey: [user, "userInfo"],
    queryFn: async () => {
      if (!user) return null
      return await getRestaurant(user.id)
    },
    enabled : !!user
  });

  return { userInfo, isLoading, error };
};