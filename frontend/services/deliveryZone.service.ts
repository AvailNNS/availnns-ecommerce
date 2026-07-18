import api from "@/services/api";

export const getDeliveryZones = async () => {
  const res = await api.get(
    "/delivery-zones"
  );

  return res.data.zones || [];
};

export const createDeliveryZone = async (
  data: any,
  token: string
) => {
  const res = await api.post(
    "/delivery-zones",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateDeliveryZone = async (
  id: string,
  data: any,
  token: string
) => {
  const res = await api.put(
    `/delivery-zones/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const deleteDeliveryZone = async (
  id: string,
  token: string
) => {
  const res = await api.delete(
    `/delivery-zones/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

