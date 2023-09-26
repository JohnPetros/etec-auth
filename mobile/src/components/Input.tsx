import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlErrorText,
  Input as InputContainer,
  InputField,
} from '@gluestack-ui/themed'

interface InputProps {
  type: 'email' | 'password' | 'text'
  label: string
  errorMessage: string | undefined
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function Input({
  type,
  label,
  placeholder,
  value,
  errorMessage,
  onChange,
}: InputProps) {
  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormControlLabel>
        <FormControlLabelText color="$light100">{label}</FormControlLabelText>
      </FormControlLabel>
      <InputContainer h={48} >
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
          value={value}
          onChangeText={onChange}
          sx={{
            ':invalid': {
              borderColor: '$red500',
            },
          }}
        />
      </InputContainer>
      {errorMessage && (
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      )}
    </FormControl>
  )
}
