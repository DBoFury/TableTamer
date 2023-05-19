import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "./AddComment.css";

interface AddCommentPropsType {
  commentary: string | null;
  handleSubmitComment: (commentary: string | null) => void;
}

const AddComment = ({
  commentary,
  handleSubmitComment,
}: AddCommentPropsType) => {
  const [formVisible, setFormVisible] = useState<boolean>(false);

  const handleAddComment = () => {
    setFormVisible(true);
  };

  const handleCancelComment = () => {
    setFormVisible(false);
  };

  const handleSubmit = () => {
    handleSubmitComment(commentary);
    setFormVisible(false);
  };

  useEffect(() => {
    if (formVisible) {
      setTimeout(() => {
        const element = document.querySelector(".modal-message-container");
        element?.scrollTo({
          top: element?.scrollHeight,
          behavior: "smooth",
        });
      }, 200);
    }
  }, [formVisible]);

  return (
    <>
      {formVisible ? (
        <div className="comment-form-container">
          <TextField
            value={commentary}
            onChange={(e) => handleSubmitComment(e.target.value)}
            color="primary"
            fullWidth
            multiline
          />
          <div className="comment-form-actions-container">
            <button onClick={handleCancelComment}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      ) : (
        <button className="sticky-button" onClick={handleAddComment}>
          {commentary ? "Edit Comment" : "Add Comment"}
        </button>
      )}
    </>
  );
};

export default AddComment;
