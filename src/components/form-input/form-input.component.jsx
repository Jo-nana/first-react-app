import { FormInputLabel, Input, Group} from './form-input.styles';

const FormInput = ({ label, ...otherProps}) => {
  return (
  <Group>
    {/* If label exists then render the label */}
    <Input
      {...otherProps}
    />
    {label && (
      <FormInputLabel shrink={otherProps.value.length}>
        {/* if the input has a value, the label will shrink (adding 'shrink' class or empty string) */}
        {label}
      </FormInputLabel>
    )}
  </Group>)
};

export default FormInput;
