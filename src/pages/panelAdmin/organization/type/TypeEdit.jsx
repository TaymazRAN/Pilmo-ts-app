import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectPostById,
	updatePost,
	// selectAllPosts,
} from "./postsSlice";
import { Button, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../../component/loading/Loading";
// import { selectAllUsers } from "../users/usersSlice";
const TypeEdit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const post = useSelector((state) => selectPostById(state, id));
	const [title, setTitle] = useState(post?.title);

	useEffect(() => {
		if (post) {
			setTitle(post.title);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [post]);

	const [requestStatus, setRequestStatus] = useState("idle");
	const dispatch = useDispatch();
	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}

	const onTitleChanged = (e) => setTitle(e.target.value);
	// const onContentChanged = (e) => setContent(e.target.value);
	// const onAuthorChanged = (e) => setUserId(Number(e.target.value));

	const canSave =
		// [title, content, userId].every(Boolean) && requestStatus === "idle";
		[title].every(Boolean) && requestStatus === "idle";

	const onSavePostClicked = () => {
		if (canSave) {
			try {
				setRequestStatus("pending");
				dispatch(
					updatePost({
						id: post.id,
						title,
						// body: content,
						// userId,
						// reactions: post.reactions,
					})
				).unwrap();

				// navigate(`/post/${id}`);
				navigate(`/admin/type`);

				// <Link to={`/admin/TypeEdit/${cellValues.id}`}> ویرایش </Link>
			} catch (err) {
				console.error("Failed to save the post", err);
			} finally {
				setRequestStatus("idle");
			}
		}
	};

	return (
		<>
			{post ? (
				<section>
					<div className="mainPanelTitle bold">ویرایش نوع سازمان</div>
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
								ویرایش
							</Button>
						</div>
					</form>
				</section>
			) : (
				<Loading />
			)}
		</>
	);
};

export default TypeEdit;
