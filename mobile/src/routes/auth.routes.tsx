import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { Auth } from '../screens/Auth'

const { Navigator, Screen } = createNativeStackNavigator()

type AppRoutes = {
  auth: undefined
  forgotPassword: undefined
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="auth" component={Auth} />
    </Navigator>
  )
}
