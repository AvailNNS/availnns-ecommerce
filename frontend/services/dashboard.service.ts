import api from "./api";

export const getDashboardStats = async (token: string) => {
  try {
    const res = await api.get("/admin/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.stats;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard stats"
    );
  }
};