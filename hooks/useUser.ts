import { getCurrentUser } from '@/libs/auth.service';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
      catch (error: any) {
        setUser(null)
      }
      finally {
        setLoading(false);
      }
    };

    fetchUser();
    
  }, []);

  return {user, loading};
};