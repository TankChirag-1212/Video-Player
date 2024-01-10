import React from "react";
import "./Contact.css";
import { useTheme } from "../../ThemeContext";

const Contact = () => {

    const { theme } = useTheme()
    
    return (
        <section className={theme === 'day' ? "main-section" : "main-section-dark"}>
                <div className="left-container">
                    <h1>Contact Us</h1>
                    <p className={theme === 'day' ? "left-container-p" : "left-container-p-dark"}>
                    Need to get in touch with us? fill out the form with your
                    inquiry
                    </p>
                    <iframe
                    className={theme === 'day' ? "iframe" : "iframe-dark"}
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2483.037866561561!2d-0.06393354532241083!3d51.512521285907255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTHCsDMwJzQ1LjEiTiAwwrAwMyc0My42Ilc!5e0!3m2!1sen!2sin!4v1704382236035!5m2!1sen!2sin"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className="right-container">
                        <form action="https://formspree.io/f/xkndnpno" method="POST" className={theme === 'day' ? "right-form": "right-form-dark"}>
                            <input type="text" name="FirstName" placeholder="First Name*" required autoComplete="off"/>
                            <input type="text" name="LastName" placeholder="Last Name" autoComplete="off"/>
                            <input type="email" name="Email" placeholder="Email*" required autoComplete="off"/>
                            <textarea name="message" cols="30" rows="4" placeholder="Enter Your Message"></textarea>
                            <button type="submit" className="btn btn-primary send-btn">Send</button>
                        </form>
                </div>
        </section>
    );
};

export default Contact;
