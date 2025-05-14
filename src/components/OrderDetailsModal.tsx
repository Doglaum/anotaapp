import { View } from 'react-native'
import { OverlayerModal } from '@/components/OverlayModal'
import { Order } from '@/database/models'
import OrderInformation from './OrderInformation'

const OrderDetailsModal = ({
   onClose,
   order,
   openModal
}: {
   onClose?: () => void
   order: Order
   openModal: boolean
}) => {
   return (
      <View>
         <OverlayerModal
            title="Detalhes do pedido"
            overlayModalVisible={openModal}
            onClose={onClose}
         >
            <OrderInformation order={order}></OrderInformation>
         </OverlayerModal>
      </View>
   )
}

export default OrderDetailsModal
