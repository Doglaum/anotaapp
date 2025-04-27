import { useLocalSearchParams } from 'expo-router'
import RegisterProduct from './register'

export default function EditProduct() {
   const { id } = useLocalSearchParams<{ id: string }>()
   return <RegisterProduct editProductId={Number(id)} />
}
