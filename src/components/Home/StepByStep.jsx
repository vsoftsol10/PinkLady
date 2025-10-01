import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Package, FlaskConical } from 'lucide-react';
import image1 from "../../assets/Process/001.jpg"
import image2 from "../../assets/Process/002.jpg"
import image3 from "../../assets/Process/003.jpg"
import image4 from "../../assets/Process/004.jpg"
import image5 from "../../assets/Process/005.jpg"
import image6 from "../../assets/Process/006.jpg"
import image7 from "../../assets/Process/007.jpg"
import image8 from "../../assets/Process/008.jpg"
import image9 from "../../assets/Process/009.jpg"
import image10 from "../../assets/Process/Ready.png"
import { FcDataProtection } from 'react-icons/fc';


const StepByStep = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Quality Check of Raw Materials",
      description: "The process begins by carefully inspecting the raw materials. Here, a staff member in a hygienic uniform, complete with a hairnet, mask, and gloves, is checking the quality of the primary material—the large roll of pure cotton used for the napkin. This step ensures that only the best, purest materials are used.",
      icon: <CheckCircle className="w-6 h-6 text-pink-500" />,
      image: image1
    },
    {
      id: 2,
      title: "Feeding the Machine",
      description: "Once the quality of the raw material is confirmed, the large rolls of pure cotton are carefully loaded onto the specialized manufacturing machine. This marks the beginning of the automated process, ensuring each napkin is made efficiently and hygienically.",
      icon: <Package className="w-6 h-6 text-blue-500" />,
      image: image2
    },
    {
      id: 3,
      title: "Sealing the Herbal Core",
      description: "In this crucial step, the machine applies precise pressure to the napkin's layers. This process ensures that the herbal core, made from a mix of medicinal herbs and a gel sheet, is securely sealed within the pure cotton, guaranteeing the integrity and effectiveness of the final product.",
      icon: <FlaskConical className="w-6 h-6 text-green-500" />,
      image: image3
    },
    {
      id: 4,
      title: "Individual Wrapping",
      description: "After the napkin is perfectly formed and sealed, it's immediately prepared for individual wrapping. This crucial step ensures that each napkin remains sterile and hygienic from the factory to the consumer, protecting it from any external contaminants.",
      icon: <Package className="w-6 h-6 text-purple-500" />,
      image: image4
    },
    {
      id: 5,
      title: "Bulk Packaging",
      description: "After each napkin is individually wrapped, they are carefully collected and placed into larger boxes. This bulk packaging ensures the products are ready to be sent to retailers and customers, all while maintaining their cleanliness and integrity.",
      icon: <Package className="w-6 h-6 text-orange-500" />,
      image: image5
    },
    {
      id: 6,
      title: "Final Packaging and Sealing",
      description: "In the final packaging stage, the individual packets are placed into a larger, multi-pack pouch. This branded pouch is then sealed to ensure the product's safety and integrity. A final quality check is also performed, as shown by the staff member's happy expression, ensuring every pouch is perfect before it's sent out.",
      icon: <CheckCircle className="w-6 h-6 text-indigo-500" />,
      image: image6
    },
    {
      id: 7,
      title: "Final Quality Assurance",
      description: "Before the product is deemed complete, a meticulous final quality check is performed. A sample from the production batch is closely inspected for consistency, texture, and purity. This step ensures that every single napkin meets our high standards before it reaches your hands.",
      icon: <CheckCircle className="w-6 h-6 text-red-500" />,
      image: image7
    },
    {
      id: 8,
      title: "Lab-Tested Quality Control",
      description: "In this critical phase, a sample from the raw materials is taken to the lab. Here, it undergoes a meticulous inspection under a magnifying glass to ensure it meets the company's high standards for texture, purity, and absorbency. This is a vital step in their commitment to providing a safe and effective product.",
      icon: <FlaskConical className="w-6 h-6 text-cyan-500" />,
      image: image8
    },
    {
      id: 9,
      title: "UV Sterilization for Absolute Safety",
      description: "The final and most critical step in ensuring hygiene is UV Sterilization. The finished, individually-wrapped herbal sanitary napkins are placed inside a UV sterilizer box. This powerful process uses Ultraviolet light to eliminate 99.9% of bacteria, ensuring that every napkin you receive is completely sterile, safe, and ready to provide the highest level of care.",
      icon: <CheckCircle className="w-6 h-6 text-pink-500" />,
      image: image9
    },
    {
      id: 10,
      title: "Ready for Customers",
      description: "The journey is complete! With a final check and a smile, a staff member proudly holds up the finished product. Each pouch, from the initial materials to the final packaging, has been handled with care and attention to detail, ensuring it's ready to provide comfort and natural care to customers.",
      icon: <FcDataProtection className="w-6 h-6 text-pink-500" />,
      image: image10
    },
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  return (
    <div className="max-w-7xl mx-auto mb-8 p-6 bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Pink Lady Herbal Napkin Manufacturing Process
        </h1>
        <p className="text-lg text-gray-600">
          Discover how our premium herbal napkins are crafted with care and precision
        </p>
      </div>

      {/* Main Carousel */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          {/* Left Side - Image */}
          <div className="lg:w-1/2 relative bg-gray-100">
            <img
              src={steps[currentStep].image}
              alt={steps[currentStep].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              {steps[currentStep].icon}
            </div>
            <div className="absolute top-4 right-4 bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
              {steps[currentStep].id}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {steps[currentStep].description}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <span className="text-gray-500 font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>

              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => goToStep(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'bg-pink-500 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to step ${step.id}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepByStep;