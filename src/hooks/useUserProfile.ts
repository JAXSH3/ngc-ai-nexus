
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client'; // Changed import
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/types/database";

type UpdateProfileArgs = {
  id: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
};

export function useUserProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Profile | null>({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      // Check if data is null or if there's an error that indicates "0 rows"
      if (error && error.message.includes("0 rows")) {
        console.warn(`No profile found for user ${user.id}. This might be expected if it's a new user or profile creation failed.`);
        return null; // Return null if no profile found, don't throw.
      }
      if (error) throw error; // Throw other errors

      return data as unknown as Profile;
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (values: UpdateProfileArgs) => {
      const { id, ...rest } = values;
      const { data, error } = await supabase
        .from("profiles")
        .update(rest)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Profile;
    },
    onSuccess: (data) => {
      if (data) { // Ensure data exists before setting
        queryClient.setQueryData(["profile", data.id], data);
      }
    },
  });

  return {
    user,
    profile: data,
    isLoading,
    error,
    updateProfile: updateProfile.mutateAsync,
    updating: updateProfile.isPending,
  };
}
