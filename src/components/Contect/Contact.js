import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <div title={"Contact us"} className="mt-20">
      <div className="flex flex-wrap contactus">
        <div className="80% md:w-6/12">
          <img
            src="/images/contact.jpeg"
            alt="contactus"
            className="w-full"
          />
        </div>
        <div className="w-full md:w-4/12">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and information about the product, feel free to call
            anytime; we are 24/7 available.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@Peshawrychapal.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 091-000990909
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
