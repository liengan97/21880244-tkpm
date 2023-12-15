import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import Logout from '../screens/LogoutScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Drawer = createDrawerNavigator();

export default function AuthenticatedContainer() {
	return (
		<Drawer.Navigator drawerContent={(props) => <Logout {...props} />}>
			<Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			<Drawer.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />

		</Drawer.Navigator>
	);
}
