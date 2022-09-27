import "./contact.css";
import React from "react";
import Footer from "../../../component/footer/Footer";
import MenuTop from "../../../component/menuTop/MenuTop";
import FormContact from "../../../component/formContact/FormContact";

export default function Contact() {
	return (
		<div>
            <MenuTop />
            <FormContact />
			<Footer />
		</div>
	);
}
