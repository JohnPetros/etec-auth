import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { Auth } from '../screens/Auth'
import { ForgotPassword } from '../screens/ForgotPassword'

const { Navigator, Screen } = createNativeStackNavigator()

type AuthRoutes = {
  auth: undefined
  forgotPassword: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="auth" component={Auth} />
      <Screen name="forgotPassword" component={ForgotPassword} />
    </Navigator>
  )
}
