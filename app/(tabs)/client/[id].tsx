import { useLocalSearchParams } from 'expo-router'
import RegisterClient from './register'

export default function EditProduct() {
   const { id } = useLocalSearchParams<{ id: string }>()
   return <RegisterClient editClientId={Number(id)} />
}
