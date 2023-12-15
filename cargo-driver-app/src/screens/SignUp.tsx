import React, { useEffect, useState } from 'react';
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
  FormControlLabel,
  FormControlLabelText,
  ScrollView,
} from '@gluestack-ui/themed';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import useApi from '../hooks/useApi';

export default function SignUp(props: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState<string>();
  const [idCard, setIdCard] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();
  const [carNumber, setCarNumber] = useState<string>();
  const [carNumOfSeats, setCarNumberOfSeats] = useState<number>();
  const [carBrand, setCarBrand] = useState<string>();
  const [carModel, setCarModel] = useState<string>();
  const [repeatPassBorderColor, setRepeatPassBorderColor] = useState<string>('inherit');
  const [loading, setLoading] = useState<boolean>(false);
  const api = useApi();

  useEffect(() => {
    if (repeatPassword) {
      if (repeatPassword != password) {
        setRepeatPassBorderColor('red');
      } else {
        setRepeatPassBorderColor('green');
      }
    } else {
      setRepeatPassBorderColor('inherit');
    }
  }, [password, repeatPassword])

  const handleShowPassword = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

  const onValueChange = (e: NativeSyntheticEvent<TextInputChangeEventData>, callback: any) => {
    callback(e.nativeEvent.text)
  } 

  const handleSignUp = async () => {
    setLoading(true);
    api.post("/drivers/register", {
      name,
      email,
      idCard,
      carNumber,
      seatNumber: carNumOfSeats,
      carBrand,
      carModel,
      password
    })
      .then((data) => {
        props.navigation.push('SignIn')
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  return (
    <ScrollView h="100%" w="100%">
      <Center h="100%" backgroundColor="#f5f5f5">
        <FormControl
          w="100%"
          h="100%"
          p="$4"
        >
          <VStack space="xl">
            <Heading style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 25, marginTop: 20 }}>Register an account</Heading>

            <VStack space="xs">
              <FormControlLabel>
                <FormControlLabelText>Name</FormControlLabelText>
              </FormControlLabel>
              <Input h={50}>
                <InputField
                  type="text"
                  backgroundColor="white"
                  value={name}
                  onChange={(e: any) => onValueChange(e, setName)}
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input h={50}>
                <InputField
                  type="text"
                  backgroundColor="white"
                  value={email}
                  onChange={(e: any) => onValueChange(e, setEmail)}
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <FormControlLabel>
                <FormControlLabelText>ID Card</FormControlLabelText>
              </FormControlLabel>
              <Input h={50}>
                <InputField
                  type="text"
                  backgroundColor="white"
                  value={idCard}
                  onChange={(e: any) => onValueChange(e, setIdCard)}
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <FormControlLabel>
                <FormControlLabelText>Car Number</FormControlLabelText>
              </FormControlLabel>
              <Input h={50}>
                <InputField
                  type="text"
                  backgroundColor="white"
                  value={carNumber}
                  onChange={(e: any) => onValueChange(e, setCarNumber)}
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <FormControlLabel>
                <FormControlLabelText>Number of seats</FormControlLabelText>
              </FormControlLabel>
              <Input h={50}>
                <InputField
                  type="text"
                  backgroundColor="white"
                  value={carNumOfSeats?.toString()}
                  onChange={(e:any) => onValueChange(e, setCarNumberOfSeats)}
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <FormControlLabel>
                <FormControlLabelText>Car brand</FormControlLabelText>
              </FormControlLabel>
              <Input h={50}>
                <InputField
                  type="text"
                  backgroundColor="white"
                  value={carBrand}
                  onChange={(e: any) => onValueChange(e, setCarBrand)}
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <FormControlLabel>
                <FormControlLabelText>Car model</FormControlLabelText>
              </FormControlLabel>
              <Input h={50}>
                <InputField
                  type="text"
                  backgroundColor="white"
                  value={carModel}
                  onChange={(e: any)=> onValueChange(e, setCarModel)}
                />
              </Input>
            </VStack>

            <VStack space="xs">
              <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input h={50}>
                <InputField
                  backgroundColor="white"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: any)=> onValueChange(e, setPassword)}
                />
                <InputSlot pr="$3" onPress={handleShowPassword}>
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </VStack>
            <VStack>
              <FormControlLabel>
                <FormControlLabelText>Confirm Password</FormControlLabelText>
              </FormControlLabel>
              <Input h={50} style={{ borderColor: repeatPassBorderColor }}>
                <InputField
                  backgroundColor="white"
                  type={showPassword ? 'text' : 'password'}
                  value={repeatPassword}
                  onChange={(e: any)=> onValueChange(e, setRepeatPassword)}
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
              onPress={handleSignUp}>
              {loading && <ButtonSpinner mr="$1" />}
              {!loading && <ButtonText>Create</ButtonText>}
            </Button>
            <Text lineHeight="$xs" textAlign="center" onPress={() => props.navigation.push('SignIn')}>
              Login
            </Text>

          </VStack>
        </FormControl>
      </Center>
    </ScrollView>
  );
}
