import { useState } from "react";
import { usePinInput } from "react-pin-input-hook";
import Keyboard from "react-simple-keyboard";
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

  const onKeyPress = (button: string) => {
    if (button === "{clear}") {
      handleClear();
      return;
    }

    if (button === "{bksp}") {
      handleBackspace();
      return;
    }

    let isFirstEmptyStringFound = false;

    const modifiedArray = values.map((item) => {
      if (!isFirstEmptyStringFound && item === "") {
        isFirstEmptyStringFound = true;
        return button;
      }
      return item;
    });

    setValues(modifiedArray);

    if (modifiedArray.every((item) => item !== "")) {
      handleComplete(modifiedArray.join(""));
    }
  };

  const handleClear = () => {
    setValues(Array(4).fill(""));
  };

  const handleBackspace = () => {
    let isFirstNonEmptyStringFound = false;

    const newArray = values.reverse().map((item) => {
      if (!isFirstNonEmptyStringFound && item !== "") {
        isFirstNonEmptyStringFound = true;
        return "";
      }
      return item;
    });

    setValues(newArray.reverse());
  };

  return (
    <>
      <div>
        {fields.map((fieldProps, index) => (
          <input key={index} className="pin-input__field" {...fieldProps} />
        ))}
      </div>
      <Keyboard
        layoutName="default"
        theme={
          "hg-theme-default hg-theme-numeric hg-layout-numeric numeric-theme"
        }
        layout={{
          default: ["1 2 3", "4 5 6", "7 8 9", "{clear} 0 {bksp}"],
        }}
        mergeDisplay
        display={{
          "{clear}": "Clear",
          "{bksp}": "&#8592",
        }}
        maxLength={4}
        onKeyPress={(button: string) => onKeyPress(button)}
      />
    </>
  );
};

export default LoginPage;
