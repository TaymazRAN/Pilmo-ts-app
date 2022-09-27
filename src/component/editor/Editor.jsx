import "./editor.css";
import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

class Editor extends Component {
	constructor(props) {
		super(props);

		this.modules = {
			toolbar: [
				[
					{ size: [] },
				],
				["bold", "italic", "underline", "strike"],
				[{ color: [] }, { background: [] }],
				[{ script: "super" }, { script: "sub" }],
				[{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
				[
					{ list: "ordered" },
					{ list: "bullet" },
					{ indent: "-1" },
					{ indent: "+1" },
				],
				[{ direction: "rtl" }, { align: [] }],
				["link", "image", "video", "formula"],
				["clean"],
			],
		};

		this.formats = [
			"font",
			"size",
			"bold",
			"italic",
			"underline",
			"list",
			"bullet",
			"align",
			"color",
			"background",
		];

		this.state = {
			comments: "",
		};

		this.rteChange = this.rteChange.bind(this);
	}

	rteChange = (content, delta, source, editor) => {
		console.log(editor.getHTML()); // rich text
		console.log(editor.getText()); // plain text
		console.log(editor.getLength()); // number of characters
	};

	render() {
		return (
			<div dir="ltr">
				<ReactQuill
					theme="snow"
					modules={this.modules}
					formats={this.formats}
					onChange={this.rteChange}
					value={this.state.comments || ""}
				/>
			</div>
		);
	}
}

export default Editor;
