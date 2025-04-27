interface InputFormProps {
  type: string;
  id: string;
  ariaDescribe: string;
  onChange: (changedValue: string) => void;
  value: string;
}

const InputForm = ({
  type,
  id,
  ariaDescribe,
  value,
  onChange,
}: InputFormProps) => {
  return (
    <input
      type={type}
      className="form-control"
      id={id}
      aria-describedby={ariaDescribe}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  );
};

export default InputForm;
