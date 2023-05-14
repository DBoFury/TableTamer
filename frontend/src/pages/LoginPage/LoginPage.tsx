import { useState } from "react";
import { usePinInput } from "react-pin-input-hook";
import KeyboardWrapper from "../../components/Keyboard/KeyboardWrapper";
import "react-simple-keyboard/build/css/index.css";

const LoginPage = () => {
  const [values, setValues] = useState(Array(4).fill(""));

  const handleComplete = (values: string) => {
    console.log(values);
  };

  const { fields } = usePinInput({
    values,
    onChange: (values) => {
      setValues(values);
    },
    onComplete: (values) => {
      handleComplete(values);
    },
  });

  return (
    <>
      <div>
        {fields.map((fieldProps, index) => (
          <input key={index} className="pin-input__field" {...fieldProps} />
        ))}
      </div>

      <KeyboardWrapper
        values={values}
        setValues={setValues}
        handleComplete={handleComplete}
      />
    </>
  );
};

export default LoginPage;
