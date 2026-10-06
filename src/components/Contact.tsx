import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center font-alice">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="mb-8">お問い合わせはSNSからお願いいたします</p>
      <div className="flex justify-center gap-4 mb-8">
        <a
          href="https://www.facebook.com/profile.php?id=100026439517210"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a
          href="https://twitter.com/y_renren0115"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3"
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a
          href="https://www.instagram.com/y_renren0115"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            className="mt-1 p-2 w-full border rounded"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
