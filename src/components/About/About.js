import React from "react";

const About = () => {
  return (
    <div title={"About Peshawry Chapal"} className="mt-20">
      <div className="flex flex-wrap aboutus">
        <div className="w-full md:w-6/12" style={{ width: "45%" }}>
          <img
            src="/images/aboutus.jpeg"
            alt="Peshawry Chapal"
            className="w-full"
          />
        </div>
        <div className="w-full md:w-6/12 ml-10" style={{ width: "45%" }}>
          <h1 className="text-3xl font-bold mb-4">Welcome to Peshawry Chapal</h1>
          <p className="text-justify">
            At Peshawry Chapal, we take pride in providing high-quality chapals that embody the essence of Captain Chapal, Man Peshawry Chapal, Female Peshawry Chapal, and Kids Peshawry Chapal. Our collection showcases the finest craftsmanship, comfort, and style, making each pair a statement of tradition and modernity.
          </p>
          <p className="text-justify mt-2">
            Captain Chapal, designed for the modern man, combines durability with contemporary fashion. Man Peshawry Chapal reflects the rich cultural heritage of Peshawar, capturing the essence of traditional footwear. Our Female Peshawry Chapal offers elegance and comfort for the women who appreciate timeless style. For the little ones, Kids Peshawry Chapal ensures that even the youngest members of the family step out in style.
          </p>
          <p className="text-justify mt-2">
            At Peshawry Chapal, we are committed to delivering not just footwear but an experience that resonates with the spirit of Peshawar. Explore our collection and discover the perfect pair that suits your style and taste.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
