export interface DeliveryZone {
  _id: string;

  name: string;

  deliveryFee: number;

  freeDeliveryAbove: number;

  estimatedDays: string;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}