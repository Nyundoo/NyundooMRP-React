import {OrderItem} from "./order-item";

export class Order {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public phone_number: string,
        public total: number,
        public order_items: OrderItem[],
        public created_at: string,
        public updated_at: string,
    ) {
    }
}
