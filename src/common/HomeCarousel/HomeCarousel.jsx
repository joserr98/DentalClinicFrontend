import Carousel from 'react-bootstrap/Carousel';
import './HomeCarousel.css';
import firstSlide from "../../assets/home_image.jpg"
import secondSlide from "../../assets/home_image_2.jpg"
import thirdSlide from "../../assets/home_image_3.jpg"
import fourthSlide from "../../assets/home_image_4.jpg"

export const HomeCarousel = () => {
  return (
    <Carousel  className='orange-w'>
      <Carousel.Item interval={1000}>
        <img
          className="carouselImage"
          src={firstSlide}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Our clinic</h3>
          <p>A dental clinic is a medical facility that specializes in providing dental services and treatments to patients. It typically has several treatment rooms equipped with dental chairs, tools, and equipment to perform routine and advanced dental procedures.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="carouselImage"
          src={secondSlide}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carouselImage"
          src={thirdSlide}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Waiting Room</h3>
          <p>
          A comfortable dentist waiting room features plush seating, soothing colors, and soft lighting to create a relaxing atmosphere. The room is well-maintained, clean, and organized, with a receptionist available to assist patients and answer any questions they may have.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carouselImage"
          src={fourthSlide}
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <h3>Our Personal</h3>
          <p>
          The personnel of a dental clinic typically includes a team of dental professionals such as dentists, dental hygienists, dental assistants, and administrative staff. They work together to provide patients with a range of dental services, from routine cleanings and check-ups to more complex treatments such as orthodontics, oral surgery, and cosmetic dentistry.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
