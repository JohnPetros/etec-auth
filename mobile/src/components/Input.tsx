import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input as InputContainer,
  InputField,
} from '@gluestack-ui/themed'

interface InputProps {
  type: 'email' | 'password' | 'text'
  label: string
  placeholder: string
}

export function Input({ type, label, placeholder }: InputProps) {
  return (
    <FormControl>
      <FormControlLabel>
        <FormControlLabelText color="$light100">{label}</FormControlLabelText>
      </FormControlLabel>
      <InputContainer>
        <InputField
          borderWidth={1}
          borderColor="$blue700"
          placeholder={placeholder}
          placeholderTextColor="$blue900"
          fontSize="$md"
          bg="$light100"
          h="$full"
          w="$full"
          autoCapitalize="none"
          secureTextEntry={type === 'password'}
          inputMode={type === 'email' ? type : 'text'}
        />
      </InputContainer>
    </FormControl>
  )
}
