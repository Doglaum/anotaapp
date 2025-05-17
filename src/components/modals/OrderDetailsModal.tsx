import { View } from 'react-native'
import { OverlayerModal } from '@/components/modals/'
import { Order } from '@/database/models'
import OrderInformation from '../OrderInformation'
import { useEffect, useRef } from 'react'

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
