import Tick from "../assets/images/server.png";

export default function Problem() {
  return (
    <>
      <section className="main">
        <div>
          <div className="glass text-center" style={{ marginTop: "200px" }}>
            <img className="mb-4" src={Tick} alt="Done" />
            <h3 className="text-white">Error</h3>
            <h4 className="text-white mt-4">
              We are dealing with an Internal error. Try again sometime later
            </h4>
          </div>
        </div>
      </section>
    </>
  );
}
