import Tick from "../assets/images/check.png";

export default function ThankyouPage() {
  return (
    <>
      <section className="main">
        <div>
          <div className="glass text-center" style={{ marginTop: "200px" }}>
            <img className="mb-4" src={Tick} alt="Done" />
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
