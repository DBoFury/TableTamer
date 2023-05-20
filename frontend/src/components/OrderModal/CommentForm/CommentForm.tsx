import { TextField } from "@mui/material";
import "./CommentForm.css";

interface CommentFormPropsType {
  commentary: string;
  handleSubmitComment: (text: string) => void;
  handleCancel: () => void;
  handleSubmit: () => void;
}

const CommentForm = ({
  commentary,
  handleSubmitComment,
  handleCancel,
  handleSubmit,
}: CommentFormPropsType) => {
  return (
    <div className="comment-form-container">
      <TextField
        value={commentary}
        onChange={(e) => handleSubmitComment(e.target.value)}
        color="primary"
        fullWidth
        multiline
      />
      <div className="comment-form-actions-container">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CommentForm;
