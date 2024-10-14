import Carousel from 'react-bootstrap/Carousel';
import kkkk from '../assets/kkkk.jpg';
import image from '../assets/image.jpg';
import sze from '../assets/sze.jpeg';
import vbn from '../assets/vbn.jpg';
import cde from '../assets/cde.png'
import './style.css';  

function Animé() {
  return (
    <Carousel fade interval={2000} className="custom-carousel">
      <Carousel.Item>
        <img className="d-block w-100 custom-img" src={kkkk} alt="First slide" />
        <Carousel.Caption>
          <h3 className="custom-title">First Slide</h3>
          <p className="custom-text">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 custom-img" src={image} alt="Second slide" />
        <Carousel.Caption>
          <h3 className="custom-title">Second Slide</h3>
          <p className="custom-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 custom-img" src={sze} alt="Third slide" />
        <Carousel.Caption>
          <h3 className="custom-title">Third Slide</h3>
          <p className="custom-text">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 custom-img" src={vbn} alt="Third slide" />
        <Carousel.Caption>
          <h3 className="custom-title">Third Slide</h3>
          <p className="custom-text">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item><Carousel.Item>
        <img className="d-block w-100 custom-img" src={cde} alt="Third slide" />
        <Carousel.Caption>
          <h3 className="custom-title">Third Slide</h3>
          <p className="custom-text">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Animé;
