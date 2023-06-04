import "./KeyboardWrapper.css";
import { FunctionComponent } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface IProps {
  values: string[];
  setValues: (values: string[]) => void;
  handleClear: () => void;
  handleComplete: (values: string) => void;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  values,
  setValues,
  handleClear,
  handleComplete,
}) => {
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
    <Keyboard
      layoutName="default"
      layout={{
        default: ["1 2 3", "4 5 6", "7 8 9", "{clear} 0 {bksp}"],
      }}
      theme={
        "hg-theme-default hg-theme-numeric hg-layout-numeric numeric-theme"
      }
      mergeDisplay
      display={{
        "{clear}": "Clear",
        "{bksp}": "&#8592",
      }}
      maxLength={4}
      onKeyPress={(button) => onKeyPress(button)}
    />
  );
};

export default KeyboardWrapper;
