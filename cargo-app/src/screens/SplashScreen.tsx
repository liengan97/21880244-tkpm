import { ActivityIndicator, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#157faf' }}>
      <Text style={{ fontWeight: '500', fontSize: 40, color: 'white' }}>CARGO</Text>
      <View style={{position: 'absolute', bottom: 25}}>
        <ActivityIndicator size="small" color="white" />
      </View>
    </View>
  )
}