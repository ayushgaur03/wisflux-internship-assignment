export interface order_by_user {
  invoice_no: string;
  user_id: string;
  ordered_items: object;
  amount: number;
}

export interface order_bill {
  invoice_no: string;
  user_id: string;
  ordered_items: object;
  amount: number;
  order_date: Date;
  order_time: TimeRanges;
}
