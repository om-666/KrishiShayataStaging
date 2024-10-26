import React, { useState } from 'react';
import './AboutPage.css'; // Ensure you create this CSS file to style the component

const AboutPage = () => {
  const [isEnglishDisplayed, setIsEnglishDisplayed] = useState(true);

  const translate = () => {
    setIsEnglishDisplayed(!isEnglishDisplayed);
  };

  const getButtonText = () => {
    return isEnglishDisplayed ? 'ଓଡ଼ିଆ' : 'English';
  };

  return (
    <div className="container">
      <button onClick={translate} className="translate-button">
        {getButtonText()}
      </button>
      <div className="content">
        {isEnglishDisplayed ? (
          // English Text
          <div id="English">
            <div className="section">
              <div className="text-section">
                <h1 className="heading">Our Mission</h1>
                <p className="paragraph">
                  At Krishi Sahayata, our mission is to revolutionize crop insurance through innovation and technology. We understand the challenges faced by farmers and the government alike, and our solution aims to bridge the gap by providing a comprehensive platform for seamless crop insurance services.
                </p>
                <h1 className="heading">Our Solution</h1>
                <p className="paragraph">
                  Crop Insurance is an integrated IT solution and a web-based ecosystem designed to streamline service delivery, unify fragmented databases, and eliminate manual processes. Our platform offers features such as:
                </p>
                <ul className="feature-list">
                  <li>Local-language support for enhanced accessibility</li>
                  <li>SMS notifications and helpline support for farmers</li>
                  <li>Verification of claims using meteorological data</li>
                  <li>Transparent administration through Aadhar integration</li>
                  <li>Guidance on insurance policies and video tutorials for farmer awareness</li>
                </ul>
              </div>
              <div className="image-section">
                <img className="main-image" src="./assets/pexels-pixabay-235731.jpg" alt="A group of People" />
              </div>
            </div>

            <div className="section about-us">
              <div className="text-section">
                <h1 className="heading">About Us</h1>
                <p className="paragraph">
                  We are a group of passionate 3rd-year students at Siksha 'O' Anusandhan University, driven by our shared love for technology and our commitment to solving real-world problems.
                </p>
              </div>
              <div className="team-section">
                <div className="team-grid">
                  {['Sudiksha', 'OTP', 'Sumit', 'Smriti', 'Chanchal'].map((name, index) => (
                    <div key={index} className="team-member">
                      <img className="team-image" src={`./assets/${name.toLowerCase()}.jpg`} alt={`${name}`} />
                      <p className="team-name">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Odia Text
          <div id="Odia">
            <div className="section">
              <div className="text-section">
                <h1 className="heading">ଆମର ଲକ୍ଷ୍ୟ</h1>
                <p className="paragraph">
                  କୃଷି ସହାୟତାରେ ଆମର ଲକ୍ଷ୍ୟ ହେଉଛି ଉଦ୍ଭାବନ ଏବଂ ପ୍ରଯୁକ୍ତି ବିଦ୍ୟା ମାଧ୍ୟମରେ ଫସଲ ବୀମାରେ ବୈପ୍ଳବିକ ପରିବର୍ତ୍ତନ ଆଣିବା । କୃଷକ ଏବଂ ସରକାର ସମାନ ଭାବରେ ସମ୍ମୁଖୀନ ହେଉଥିବା ଆହ୍ୱାନଗୁଡ଼ିକୁ ବୁଝୁଛୁ ଏବଂ ଆମର ସମାଧାନର ଉଦ୍ଦେଶ୍ୟ ନିରବଚ୍ଛିନ୍ନ ଫସଲ ବୀମା ସେବା ପାଇଁ ଏକ ବ୍ୟାପକ ପ୍ଲାଟଫର୍ମ ପ୍ରଦାନ କରି ଏହି ବ୍ୟବଧାନକୁ ପୂରଣ କରିବା।
                </p>
                <h1 className="heading">ଆମର ସମାଧାନ</h1>
                <p className="paragraph">
                  ଫସଲ ବୀମା ହେଉଛି ଏକ ସମନ୍ବିତ ଆଇଟି ସମାଧାନ ଏବଂ ଏକ ୱେବ-ଆଧାରିତ ଇକୋସିଷ୍ଟମ ଯାହା ସେବା ବିତରଣକୁ ସୁବ୍ୟବସ୍ଥିତ କରିବା, ଖଣ୍ଡିତ ଡାଟାବେସକୁ ଏକାଠି କରିବା ଏବଂ ମାନୁଆଲ ପ୍ରକ୍ରିୟାଗୁଡିକୁ ଦୂର କରିବା ପାଇଁ ଡିଜାଇନ୍ କରାଯାଇଛି । ଆମ ପ୍ଲାଟଫର୍ମ ବୈଶିଷ୍ଟ୍ୟ ଗୁଡିକ ପ୍ରଦାନ କରେ ଯେପରିକି:
                </p>
                <ul className="feature-list">
                  <li>ଉନ୍ନତ ଉପଲବ୍ଧତା ପାଇଁ ସ୍ଥାନୀୟ ଭାଷା ସମର୍ଥନ</li>
                  <li>କୃଷକମାନଙ୍କ ପାଇଁ ଏସଏମଏସ ବିଜ୍ଞପ୍ତି ଏବଂ ହେଲ୍ପଲାଇନ ସହାୟତା</li>
                  <li>ପାଣିପାଗ ତଥ୍ୟ ବ୍ୟବହାର କରି ଦାବି ଯାଞ୍ଚ </li>
                  <li>ଆଧାର ଏକୀକରଣ ମାଧ୍ୟମରେ ସ୍ୱଚ୍ଛ ପ୍ରଶାସନ</li>
                  <li>କୃଷକ ସଚେତନତା ପାଇଁ ବୀମା ପଲିସି ଏବଂ ଭିଡିଓ ଟ୍ୟୁଟୋରିଆଲ ଉପରେ ମାର୍ଗଦର୍ଶନ</li>
                </ul>
              </div>
              <div className="image-section">
                <img className="main-image" src="./assets/pexels-pixabay-235731.jpg" alt="A group of People" />
              </div>
            </div>

            <div className="section about-us">
              <div className="text-section">
                <h1 className="heading">ଆମର କାହାଣୀ</h1>
                <p className="paragraph">
                  ଶିକ୍ଷା ‘ଓ’ ଅନୁସନ୍ଧାନ ବିଶ୍ୱବିଦ୍ୟାଳୟର ଆମେ ତୃତୀୟ ବର୍ଷର ଛାତ୍ରମାନଙ୍କ ଏକ ଗୋଷ୍ଠୀ, ଟେକ୍ନୋଲୋଜି ପ୍ରତି ଆମର ମିଳିତ ଭଲପାଇବା ଏବଂ ବାସ୍ତବ ଦୁନିଆର ସମସ୍ୟାର ସମାଧାନ ପାଇଁ ଆମର ପ୍ରତିବଦ୍ଧତା ଦ୍ୱାରା ପରିଚାଳିତ ।
                </p>
              </div>
              <div className="team-section">
                <div className="team-grid">
                  {['Sudiksha', 'OTP', 'Sumit', 'Smriti', 'Chanchal'].map((name, index) => (
                    <div key={index} className="team-member">
                      <img className="team-image" src={`./assets/${name.toLowerCase()}.jpg`} alt={`${name}`} />
                      <p className="team-name">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
