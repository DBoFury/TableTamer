import { useRef } from "react";
import { Button, TextField } from "@mui/material";
import "./CommentForm.css";

interface CommentFormPropsType {
  commentary: string;
  handleSubmit: (text: string) => void;
  handleCancel: () => void;
}

const CommentForm = ({
  commentary,
  handleCancel,
  handleSubmit,
}: CommentFormPropsType) => {
  const commentaryRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="comment-form-container">
      <TextField
        inputRef={commentaryRef}
        defaultValue={commentary}
        color="primary"
        fullWidth
        multiline
      />
      <div className="comment-form-actions-container">
        <Button
          sx={{
            fontWeight: "bold",
          }}
          onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          sx={{
            fontWeight: "bold",
            color: "#ffffff",
            backgroundColor: "#5c6ac4",
          }}
          onClick={() => handleSubmit(commentaryRef.current?.value || "")}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
