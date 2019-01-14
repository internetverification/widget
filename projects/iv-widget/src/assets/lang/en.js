var IvWidget = IvWidget || {};

(function(ivWidget) {
  var lang = ivWidget.lang || {};
  ivWidget.lang = lang;
  lang.en = {
    BTN_AGREE: 'I Agree',
    CAPTURE: 'Capture',
    CONFIRM_SUMMARY: 'Confirm',
    DOWNLOAD_FILE: 'Download',
    EMAIL: 'Email',
    ENTER_YOUR_INFORMATION: 'Enter your information',
    ERROR_EMAIL_INVALID: 'Please enter a valid email',
    ERROR_IS_REQUIRED: 'is required',
    FIRST_NAME: 'First name',
    INVALID_STEP_TYPE: 'Invalid step type',
    LAST_NAME: 'Last name',
    NEXT: 'Next',
    PICTURE_STEP_NEXT: 'Upload photo',
    RETAKE_PHOTO: 'Retake photo',

    INFORMATION_STEP_TITLE: 'Information',
    ID_PICTURE_STEP_TITLE: 'Id picture',
    FACE_PICTURE_STEP_TITLE: 'Face picture',
    POA_STEP_TITLE: 'Proof of address upload',
    ID_PICTURE_SUBTITLE: 'Lastly, take a pic of your Government ID card',
    SELFIE_PICTURE_SUBTITLE: 'Take a pic of your face',
    ID_PICTURE_CAPTURE: 'Take Id picture',
    SELFIE_PICTURE_CAPTURE: 'Take selfie picture',

    GLOBAL_TITLE: 'Verify your age',
    FIRST_STEP_CONTENT: `
    <h1>Start verification</h1>
    <p class="text-center text-bold">
      Before we continue please be sure to have an id card with you
    </p>
    <div class="card" style="padding: 10px">
      <div class="card-content">
        <p>This verification process is in steps</p>
        <ul>
          <li>Fill a personal information form</li>
          <li>Take a picture of your face</li>
          <li>Take a picture of your id</li>
        </ul>
      </div>
    </div>
    <br>
    `,
    CUSTOM_GREEN_CONTENT: `
    <p>We need to verify your age by taking a photo of you, and your government issued ID card. When you click the button below, you will be prompted to grant access to your phone or computers camera.</p><br>
    `,
    GLOBAL_FOOTER_TEXT: `
    <br>
        <h2 class="text-center">Why is this required?</h2>
        <p class="text-justify">Age Verification is requied to protect minors fom unauthorized access to our products.
        We prohibits the underage from obtaining products. Our sytem responsibly compares an online visitor's
        government issued ID and their real-time photograph to accurately establish age.
        Our serious due diligence demonstrates the highest levels of compliance and social responsibility to consumers, parents, law enforcement agencies and regulatory bodies.
        </p>
    `
  };
})(IvWidget);
