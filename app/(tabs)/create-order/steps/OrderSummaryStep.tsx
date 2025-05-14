import { Order } from '@/database/models'
import { OrderInformation } from '@/components'

const OrderSummaryStep = ({ order }: { order: Partial<Order> }) => {
   return <OrderInformation order={order} />
}

export default OrderSummaryStep
