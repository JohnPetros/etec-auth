import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { Subject } from '../screens/Subject'

const { Navigator, Screen } = createNativeStackNavigator()

type AppRoutes = {
  home: undefined
  subject: { id: string }
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="subject" component={Subject} />
    </Navigator>
  )
}
