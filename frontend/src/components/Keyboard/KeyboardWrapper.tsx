import { FunctionComponent, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./KeyboardWrapper.css";

interface IProps {
  onSubmitHandler: () => void;
  keyboardRef: MutableRefObject<null>;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onSubmitHandler,
  keyboardRef,
}) => {
  const onChange = (input: string) => {
    console.log("Input changed", input);
  };

  const onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    if (button === "{clear}") handleClear();
  };

  const handleClear = () => {
    keyboardRef.current?.clearInput();
  };

  return (
    <Keyboard
      keyboardRef={(r) => (keyboardRef.current = r)}
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
      onChange={(input) => onChange(input)}
      onKeyPress={(button) => onKeyPress(button)}
      onComplete={onSubmitHandler}
    />
  );
};

export default KeyboardWrapper;
