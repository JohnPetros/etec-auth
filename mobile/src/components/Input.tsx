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
      <InputContainer h={48}>
        <InputField
          borderWidth={2}
          borderColor="$blue700"
          placeholder={placeholder}
          placeholderTextColor="$blue900"
          fontSize="$md"
          bg="$light100"
          h="$full"
          autoCapitalize="none"
          secureTextEntry={type === 'password'}
          inputMode={type === 'email' ? type : 'text'}
        />
      </InputContainer>
    </FormControl>
  )
}
