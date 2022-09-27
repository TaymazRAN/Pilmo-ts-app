import "./notFound.css";
import React from "react";
import Footer from "../../component/footer/Footer";
import MenuTop from "../../component/menuTop/MenuTop";

export default function NotFound() {
	return (
		<div>
			<MenuTop />
			<div className="bodyhome">
				<h1>404 Error</h1>
				<p className="zoom-area">
					<b> خطا </b> این صفحه نا موجود میباشد
				</p>
				<section className="error-container">
					<span>4</span>
					<span>
						<span className="screen-reader-text">0</span>
					</span>
					<span>4</span>
				</section>
			</div>
			<Footer />
		</div>
	);
}
