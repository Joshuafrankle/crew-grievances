import Tick from "../assets/images/check.png";

export default function ThankyouPage() {
  return (
    <>
      <section className="main">
        <div>
          <div className="error-glass text-center">
            <img className="error-img mb-4" src={Tick} alt="Done" />
            <h3 className="text-white"> Application submitted!</h3>
            <h4 className="text-white mt-4">
              Thanks for submitting your application. Our team take prior action
              soon.
            </h4>
          </div>
        </div>
      </section>
    </>
  );
}
