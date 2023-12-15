import React, { useContext, useState } from 'react';
import {
  FormControl,
  VStack,
  Heading,
  Text,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Button,
  ButtonText,
  Center,
  ButtonSpinner,
  View
} from '@gluestack-ui/themed';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { useAuth } from '../hooks/useAuth';

export default function Login(props: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('user1@gmail.com');
  const [password, setPassword] = useState('12345');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const [error, setError] = useState<string | undefined>();

  const handleShowPassword = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

  const onValueChange = (e: NativeSyntheticEvent<TextInputChangeEventData>, callback: any) => {
    callback(e.nativeEvent.text)
  } 

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      login(email, password)
        .catch(err => setError(err))
        .finally(() => setLoading(false));
      return;
    }
  };

  return (
    <Center h="100%" backgroundColor="#f1f6f8">
      <FormControl
        w="100%"
        p="$4"
      >
        <VStack space="xl">
          <Heading lineHeight="$md" style={{ fontFamily: 'Montserrat-Regular' }}>Let's Sign you in</Heading>
          <VStack space="xs">
            <Input h={50}>
              <InputField
                type="text"
                placeholder="Email"
                backgroundColor="white"
                value={email}
                onChange={(e: any) => onValueChange(e, setEmail)}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Input h={50}>
              <InputField
                backgroundColor="white"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e: any) => onValueChange(e, setPassword)}
              />
              <InputSlot pr="$3" onPress={handleShowPassword}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <Button
            disabled={loading}
            h={50}
            w="100%"
            onPress={handleLogin}>
            {loading && <ButtonSpinner mr="$1" />}
            {!loading && <ButtonText>SIGN IN</ButtonText>}
          </Button>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text lineHeight="$xs" textAlign="center">
            Forgot password?
          </Text>
          <Text lineHeight="$xs" textAlign="center" onPress={() => props.navigation.push("SignUp")}>
            Signup
          </Text>
          </View>
        </VStack>
      </FormControl>
    </Center>
  );
}
