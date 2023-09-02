import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";


export const useTopics = () => useQuery({
    queryKey: ['useTopics'],
    queryFn: () => apiClient.default.getTopicsTopicsGet()
})