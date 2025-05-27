import { useLocalSearchParams } from 'expo-router'
import RegisterProductGroup from './register'

export default function EditProduct() {
   const { id } = useLocalSearchParams<{ id: string }>()
   return <RegisterProductGroup editProductGroupId={Number(id)} />
}
