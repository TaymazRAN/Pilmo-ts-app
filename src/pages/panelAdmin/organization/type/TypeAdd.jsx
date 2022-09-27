import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import { addNewPost } from "./postsSlice";
// import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const TypeAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  // چند  تا میتونی  اضافه کنی
  // const [content, setContent] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  // const users = useSelector(selectAllUsers)
  const onTitleChanged = (e) => setTitle(e.target.value);
  // const onContentChanged = e => setContent(e.target.value)
  // const onAuthorChanged = e => setUserId(e.target.value)
  // const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
  const canSave = [title].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    // if (canSave) {
    try {
      setAddRequestStatus("pending");
      // dispatch(addNewPost({ title, body: content, userId })).unwrap();
      // چند  تا میتونی  اضافه کنی
      dispatch(addNewPost({ title })).unwrap();
      setTitle("");
      // setContent("");
      // setUserId("");
      navigate(`/admin/type`);
    } catch (err) {
      console.error("Failed to save the post", err);
    } finally {
      setAddRequestStatus("idle");
    }
    // }
  };
  // const usersOptions = users.map(user => (
  //     <option key={user.id} value={user.id}>
  //         {user.name}
  //     </option>
  // ))

  return (
    <section>
      <div className="mainPanelTitle bold">اضافه کردن نوع سازمان</div>
      <form>
        <div className="profileInputContainer">
          <TextField
            className="profileInput"
            autoFocus
            label="نوع سازمان"
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "10px" }}
          />
        </div>
        <div className="profileInputContainer">
          <Button
            variant="outlined"
            className="profileInput"
            component="label"
            margin="dense"
            color="error"
            onClick={(event) => navigate("/admin/type")}
            id="logoFileName"
            sx={{ padding: "15px 0", marginTop: "4px" }}
            fullWidth
          >
            انصراف
          </Button>

          <Button
            variant="outlined"
            className="profileInput"
            component="label"
            margin="dense"
            id="logoFileName"
            color="primary"
            sx={{ padding: "15px 0", marginTop: "4px" }}
            fullWidth
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            اضافه کردن
          </Button>
        </div>
      </form>
    </section>
  );
};
export default TypeAdd;
