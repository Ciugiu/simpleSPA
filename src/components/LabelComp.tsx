interface LabelCompProps {
  htmlFor: string;
  displayText: string;
}

const LabelComp = ({ htmlFor, displayText }: LabelCompProps) => {
  return (
    <label htmlFor={htmlFor} className="form-label">
      {displayText}
    </label>
  );
};

export default LabelComp;
