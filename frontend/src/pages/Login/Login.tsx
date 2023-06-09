import "react-simple-keyboard/build/css/index.css";
import KeyboardWrapper from "../../components/Keyboard/KeyboardWrapper";
import { setJwtToken } from "../../stores/reducers";
import { useState } from "react";
import { usePinInput } from "react-pin-input-hook";
import { useDispatch } from "react-redux";
import api from "../../components/API/api";
import "./Login.css";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState(Array(4).fill(""));
  const [error, setError] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const closeModal = () => {
    setError(null);
  };

  const handleClear = () => {
    setValues(Array(4).fill(""));
  };

  const handleComplete = (pin: string) => {
    api
      .post("/login", {
        pin_code: pin,
      })
      .then((response) => {
        const jwt = response.data.accessToken;
        dispatch(setJwtToken(jwt));
        localStorage.setItem("token", jwt);
        setTimeout(() => {
          handleClear();
          navigate("/");
        }, 200);
      })
      .catch((error) => {
        handleError(error.response.data);
        handleClear();
      });
  };

  const { fields } = usePinInput({
    values,
    placeholder: "",
    mask: true,
    onChange: (values) => {
      setValues(values);
    },
    onComplete: (values) => {
      handleComplete(values);
    },
  });

  return (
    <div className="login-container">
      <div className="pincode-input-container">
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
      {error && (
        <ErrorModal open={!!error} message={error} onClose={closeModal} />
      )}
    </div>
  );
};

export default LoginPage;
