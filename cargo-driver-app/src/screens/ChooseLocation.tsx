import { ScrollView, StyleSheet, View } from "react-native";
import { AddressInput } from "./AddressInput";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import TripPreviewScreen from "./BookATripScreen";

export function ChooseLocation({ navigation }: any) {
  const [pickupLoc, setPickupLoc] = useState<any>();
  const [destinLoc, setDestinLoc] = useState<any>();

  const handleClickDone = () => {
    navigation.navigate('TripContainer', { pickupLoc, destinLoc });
  }

  const fetchPickupLoc = (lat: any, lng: any) => {
    setPickupLoc({ latitude: lat, longitude: lng });
  }

  const fetchDestinLoc = (lat: any, lng: any) => {
    
    setDestinLoc({ latitude: lat, longitude: lng });
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled' style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
          <AddressInput
            onPressAddess={fetchPickupLoc}
            placeholder="Your pickup location"
          />
        <View style={{ marginBottom: 16 }}></View>
          <AddressInput
            onPressAddess={fetchDestinLoc}
            placeholder="Your destination location"
          />
          <Button
            onPress={handleClickDone}
            text="Confirm selected locations"
            styles={{ marginTop: 24, borderColor: 'gray', borderRadius: 3 }}
          />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})