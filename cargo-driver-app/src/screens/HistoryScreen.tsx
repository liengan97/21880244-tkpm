import { Text, View } from 'react-native';
import useApi from '../hooks/useApi';
import { useUser, useOnlineLocation } from '../hooks';
import { useEffect, useState } from 'react';



export default function HistoryScreen(props: any) {
	const { email: driverId } = useUser();
  const [history, setHistory] = useState<any>();
	const api = useApi();

	useEffect(() => {
		fecthHistory();
	}, []);

	const fecthHistory = async () => {
		const trips: any = await api.get(`/drivers/trips/${driverId}`);
    setHistory(trips.data);
	};

	return (
		<View style={{ position: 'absolute', top: 50, width: '100%', alignItems: 'center' }}>
			<Text style={{ fontSize: 30 , padding: 10 }}>History</Text>
      {history?.map((h: any) => (
        <View key={h.id}  style={{ padding:5}}>
          <Text style={{ padding:2 }}>Driver information: {h.driverName} - {h.carNumber} - {h.carBrand} - Price: {h.price}</Text>
          <Text style={{ padding:2 }}>Pick at: {h.pickLat} - {h.pickLong}</Text>
          <Text style={{ padding:2 }}>Drop at: {h.desLat} - {h.desLong}</Text>
          <Text style={{ padding:2 }}>Status {h.status} - {h.updatedAt}</Text>
          <Text style={{ padding:2 }}>Price: {h.price} - {h.paymentMethod}</Text>
		  <Text style={{ alignItems: 'center' }}>___________</Text>
        </View>
      ))}
		</View>
	);
  }
