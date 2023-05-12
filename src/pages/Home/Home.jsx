import React from "react";
import "./Home.css";
import firstSlide from "../../assets/home_image.jpg";
import secondSlide from "../../assets/home_image_2.jpg";
import thirdSlide from "../../assets/home_image_3.jpg";
import fourthSlide from "../../assets/home_image_4.jpg";

export const Home = () => {
  return (
    <div className="homeDesign white">
      <div className="section ">
        <div className="img-section">
          <div className="img-div">
            <img src={firstSlide} alt="dental_clinic" />
          </div>
        </div>
        <div className="text-section">
        <h3>Our clinic</h3>
          <p>A dental clinic is a medical facility that specializes in providing dental services and treatments to patients. It typically has several treatment rooms equipped with dental chairs, tools, and equipment to perform routine and advanced dental procedures.</p>
        </div>
      </div>
      <div className="section ">
        <div className="text-section">
        <h3>Waiting Room</h3>
          <p>
          A comfortable dentist waiting room features plush seating, soothing colors, and soft lighting to create a relaxing atmosphere. The room is well-maintained, clean, and organized, with a receptionist available to assist patients and answer any questions they may have.
          </p>
        </div>
        <div className="img-section">
          <div className="img-div">
            <img src={secondSlide} alt="waiting_room" />
          </div>
        </div>
      </div>
      <div className="section ">
        <div className="img-section">
          <div className="img-div">
            <img src={thirdSlide} alt="dentist_room" />
          </div>
        </div>
        <div className="text-section">
        <h3>Dentist Room</h3>
          <p>
          The dentist's office typically includes a waiting room, one or more treatment rooms equipped with dental chairs and tools, and a sterilization area. The facilities may also include X-ray machines, specialized equipment for orthodontics or oral surgery, and a reception area with administrative staff.
          </p>
        </div>
      </div>
      <div className="section ">
        <div className="text-section">
        <h3>Our Personal</h3>
          <p>
          The personnel of a dental clinic typically includes a team of dental professionals such as dentists, dental hygienists, dental assistants, and administrative staff. They work together to provide patients with a range of dental services, from routine cleanings and check-ups to more complex treatments such as orthodontics, oral surgery, and cosmetic dentistry.
          </p>
        </div>
        <div className="img-section">
          <div className="img-div">
            <img src={fourthSlide} alt="personal" />
          </div>
        </div>
      </div>
    </div>
  );
};
