interface AlertCompProps {
  alertType: any;
  text: string;
}

const AlertComp = ({ alertType, text }: AlertCompProps) => {
  return (
    <div className={`alert ${alertType}`} role="alert">
      {text}
    </div>
  );
};

export default AlertComp;
