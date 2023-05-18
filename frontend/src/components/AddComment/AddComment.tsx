import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../../stores/reducers";
import { AppState, OrderType } from "../../stores/types";
import { TextField } from "@mui/material";
import "./AddComment.css";

const AddComment = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const order: OrderType | null = useSelector((state: AppState) => state.order);
  const dispatch = useDispatch();

  const handleAddComment = () => {
    setFormVisible(true);
  };

  const handleCancelComment = () => {
    setFormVisible(false);
  };

  const handleSubmitComment = () => {
    if (order) {
      dispatch(setOrder({ ...order, commentary: textAreaValue }));
    } else {
      dispatch(
        setOrder({ user: null, products: null, commentary: textAreaValue })
      );
    }
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
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            color="primary"
            fullWidth
            multiline
          />
          <div className="comment-form-actions-container">
            <button onClick={handleCancelComment}>Cancel</button>
            <button onClick={handleSubmitComment}>Submit</button>
          </div>
        </div>
      ) : (
        <button className="sticky-button" onClick={handleAddComment}>
          {order?.commentary ? "Edit Comment" : "Add Comment"}
        </button>
      )}
    </>
  );
};

export default AddComment;
