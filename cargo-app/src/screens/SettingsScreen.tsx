import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

export default function SettingsScreen() {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleLogOut = () => {
    setLoading(true);
    logout().catch(error => console.error(error)).finally(() => setLoading(false));
  }

  return (
    <Button loading={loading} text="Logout" onPress={handleLogOut} />
  );
}