export class CreateOrderDto {
  user_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  order_date: Date;
}
