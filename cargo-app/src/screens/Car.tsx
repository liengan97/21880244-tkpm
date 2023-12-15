import { View, Image, Text, TouchableOpacity } from "react-native";

type Props = {
  id: number,
  imageSrc: any,
  name: string,
  seats: number,
  price: number,
  selected?: boolean,
  onClick: any,
  active: boolean
}

export default function Car({ id, imageSrc, name, seats, price, onClick, active }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onClick(id)}
      style={{ display: 'flex', flexDirection: 'row', borderColor: '#77c7ee', borderWidth: 1, borderRadius: 5, padding: 15, marginVertical: 5, backgroundColor: active ? '#e4ecf0' : 'white' }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image source={imageSrc} style={{ width: 32, height: 32 }} />
        <View style={{ paddingLeft: 10 }}>
          <Text style={{fontWeight: 'bold'}}>{name}</Text>
          <Text>{seats} {seats > 1 ? 'seats' : 'seat'}</Text>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Text>{new Intl.NumberFormat().format(price)}đ</Text>
      </View>
    </TouchableOpacity>
  )
}