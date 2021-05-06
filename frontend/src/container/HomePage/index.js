import React from 'react';
import Layout from '../../components/Layout';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBIcon, MDBBtn } from "mdbreact";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import n1 from '../../images/Capture (2).PNG';
import n2 from '../../images/vocal for local.jpg';
import './style.css';
import FooterPage from '../../components/Footer';
import $ from 'jquery';
/**
* @author
* @function HomePage
**/

const HomePage = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <Layout/>
      <Flippy
        flipOnHover={true} // default false
        flipOnClick={false} // default false
        flipDirection="horizontal" // horizontal or vertical
      >
        <FrontSide>
          <img src={n1} style={{ marginTop: "84px", width: "100%", height: "642px" }} />
          <div class="centered">Aapki vridhi yani hamari vridhi</div>
        </FrontSide>
        <BackSide>
          <img src={n2} style={{ marginTop: "84px", width: "100%", height: "642px" }} />
        </BackSide>
      </Flippy>
      <br /><br /><br />
      <h2 style={{ fontFamily: "Georgia", fontWeight: "bolder" }}>Amazing Offers</h2><br /><br /><br />
      <MDBCarousel
        activeItem={1}
        length={2}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
        style={{ width: "100%" }}
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <a href="/product/604a62e6824d6743ec69f37e">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/apple.PNG"
                  alt="1 slide"
                  style={{ height: "400px" }}
                />
              </a>
            </MDBView>
            <MDBMask overlay="black-light" />
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <a href="/category/5ffdd29744c1cd618c8bff50">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/kitchen and dinning.PNG"
                  alt="2 slide"
                  style={{ height: "400px" }}
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
      <br /><br /><br />
      <h2 style={{ fontFamily: "Georgia", fontWeight: "bolder" }}>Shop By Category</h2><br /><br /><br />
      <MDBCarousel
        activeItem={1}
        length={5}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
        style={{ width: "100%" }}
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <a href="/category/5ffdd03144c1cd618c8bff4e">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/LUQ50EhOD_food1.jpeg"
                  alt="1 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
            <MDBMask overlay="black-light" />
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <a href="/category/5ffdd1b944c1cd618c8bff4f">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/qnBd4BeOX_footwear_banner.jpg"
                  alt="2 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <a href="/category/5ffdd29744c1cd618c8bff50">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/p0svlj6_-_h&k.jpg"
                  alt="3 slide"
                  style={{ height: "600px" }}
                />
              </MDBView>
            </a>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="4">
            <a href="/category/601440c69c1ea23c4cb84bf5">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/C3or9P_Gh_electronics.jpg"
                  alt="4 slide"
                  style={{ height: "600px" }}
                />
              </MDBView>
            </a>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="5">
            <a href="/category/601e4fb8cfdbdf1324b3f368">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/hIlI9_0sC_fashion.png"
                  alt="5 slide"
                  style={{ height: "600px" }}
                />
              </MDBView>
            </a>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
      <br /><br /><br />
      <h2 style={{ fontFamily: "Georgia", fontWeight: "bolder" }}>Shop By Sub Category</h2><br /><br /><br />
      <MDBCarousel
        activeItem={1}
        length={12}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
        style={{ width: "100%" }}
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <a href="/category/5ffdd03144c1cd618c8bff4e">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/82VjnotzK_pc.webp"
                  alt="1 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
            <MDBMask overlay="black-light" />
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <a href="/category/5ffdd03144c1cd618c8bff4e">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/q3knRnTNC_ch.jpg"
                  alt="2 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <a href="/category/5ffdd03144c1cd618c8bff4e">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/Df5SvTiFf_staple.jpg"
                  alt="3 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="4">
            <MDBView>
              <a href="/category/5ffdd1b944c1cd618c8bff4f">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/DFdxuWKix_floaters.jpg"
                  alt="4 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="5">
            <MDBView>
              <a href="/category/5ffdd1b944c1cd618c8bff4f">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/Om-TOzOgi_sandals.jpg"
                  alt="4 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="6">
            <MDBView>
              <a href="/category/5ffdd1b944c1cd618c8bff4f">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/Cariuma_Sneaker_Review_FB.webp"
                  alt="4 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="7">
            <MDBView>
              <a href="/category/5ffdd29744c1cd618c8bff50">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/UAdJEbNiT_ka.jpg"
                  alt="4 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="8">
            <MDBView>
              <a href="/category/5ffdd29744c1cd618c8bff50">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/1w53lTViZ_decor.jpg"
                  alt="4 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="9">
            <MDBView>
              <a href="/category/601440c69c1ea23c4cb84bf5">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/0Eh_zrmV5_jdP9jushc-consumer electronics.jpg"
                  alt="4 slide"
                  style={{ height: "600px" }}
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="10">
            <a href="/category/601440c69c1ea23c4cb84bf5">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/JMF6kaUmu_smartphone.jpg"
                  alt="5 slide"
                  style={{ height: "600px" }}
                />
              </MDBView>
            </a>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="11">
            <a href="/category/601e4fb8cfdbdf1324b3f368">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/_TXiVcY8z_men.jpg"
                  alt="5 slide"
                  style={{ height: "600px" }}
                />
              </MDBView>
            </a>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="12">
            <a href="/category/601e4fb8cfdbdf1324b3f368">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/public/e19jX8l24_womenswear.jpg"
                  alt="5 slide"
                  style={{ height: "600px" }}
                />
              </MDBView>
            </a>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
      <br /><br/><br/>
      <div style={{backgroundColor:"#001a4d", color: "white", textTransform: "uppercase" , fontFamily: "Arial"}}>
        <br/>
        <h2 style={{fontWeight: "bolder" }}>Vridhi Cares</h2><br/>
        <p>
        We do not ask for  back account or card details verbally or telephonically.
        </p>
        <p>
        We also do not ask for money to participate  in any of our offers or run any lucky draws.
        </p> <br/>
      </div><br/><br/>
      <div>{/*
      <iframe className="chat" src="https://console.dialogflow.com/api-client/demo/embedded/">  add your embedded file code over here for chatbot 
      </iframe> 
      </div> */}
      <MDBIcon fab icon="rocketchat" size="3x" style={{ color: "#001a4d" }} onClick={()=>{$(".chat").fadeToggle()}}/>
      <FooterPage />
    </div>

  )

}

export default HomePage
