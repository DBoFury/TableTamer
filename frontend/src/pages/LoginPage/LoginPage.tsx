import "react-simple-keyboard/build/css/index.css";
import KeyboardWrapper from "../../components/Keyboard/KeyboardWrapper";
import { setJwtToken } from "../../stores/reducers";
import { useState } from "react";
import { usePinInput } from "react-pin-input-hook";
import { useDispatch } from "react-redux";
import api from "../../components/API/api";

const LoginPage = () => {
  const [values, setValues] = useState(Array(4).fill(""));
  const dispatch = useDispatch();

  const handleClear = () => {
    setValues(Array(4).fill(""));
  };

  const handleComplete = (pin: string) => {
    console.log(pin);
    api
      .post("/login", {
        pin_code: pin,
      })
      .then((response) => {
        const jwt = response.data.access_token;
        dispatch(setJwtToken(jwt));
        localStorage.setItem("token", jwt);
      })
      .catch((error) => {
        console.log(error);
      });

    handleClear();
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
        handleClear={handleClear}
        handleComplete={handleComplete}
      />
    </>
  );
};

export default LoginPage;
