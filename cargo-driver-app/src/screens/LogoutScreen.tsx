import { useAuth } from "../hooks/useAuth";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";

export default function Logout(props: any) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout().catch((e) => console.error(e.message));
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout}></DrawerItem>
    </DrawerContentScrollView>
  );
}