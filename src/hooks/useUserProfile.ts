
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
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
      if (error) throw error;
      return data as Profile;
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
      return data as Profile;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile", data.id], data);
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
