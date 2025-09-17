import React from "react";
import PaapatchiLogo from "../../assets/PapaatchiLogo.png";

const Paapatchi = () => {
  return (
    <div className="flex justify-center px-6 py-12  ">
      <div className="flex flex-col p-6 md:flex-row items-center  max-w-7xl mx-auto gap-10">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-lg font-serif leading-relaxed text-gray-700">
            <span className="text-2xl font-bold text-[#7e9e4a]">Paapatchi</span>{" "}
            is a trusted herbal brand committed to creating natural,
            eco-friendly, and sustainable products. Every product is crafted
            with pure ingredients drawn from nature, ensuring health, safety,
            and environmental care. <br />
            <span className="font-semibold">
              Paapatchi stands for authenticity and the power of herbs to
              enhance everyday living.
            </span>
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={PaapatchiLogo}
            alt="Paapatchi logo"
            className="w-64 md:w-80 rounded-xl  hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
     
    </div>
  );
};

export default Paapatchi;
