import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  onPress?: () => any,
  styles?: {},
  text: string,
  loading?: boolean
}

export default function Button({ onPress, styles, text, loading }: Props) {
  return (
    <TouchableOpacity disabled={loading} onPress={onPress} style={{ ...internalStyles.btnStyle, ...styles }}>
      {loading && <ActivityIndicator color={'white'} />}
      {!loading && <Text style={{ color: 'white' }}>{text}</Text>}
    </TouchableOpacity>
  )
}

const internalStyles = StyleSheet.create({
  btnStyle: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#157faf',
    paddingHorizontal: 16,
    borderWidth: 1,
  }
})