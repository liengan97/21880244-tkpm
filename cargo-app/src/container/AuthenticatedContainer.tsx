

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
const Tab = createBottomTabNavigator();

export default function AuthenticatedContainer() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelPosition: "beside-icon",
      tabBarLabelStyle: {
        fontWeight: "700",
        fontSize: 15,
      },
      tabBarIconStyle: { display: "none" },
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "Home", headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: "Settings" }} />
    </Tab.Navigator>
  );
}
