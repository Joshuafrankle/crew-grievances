import Warning from "../assets/images/warning.png";

export default function Error404() {
  return (
    <>
      <section className="main">
        <div>
          <div className="glass text-center" style={{ marginTop: "200px" }}>
            <img className="pattarai-logo mb-4" src={Warning} alt="Done" />
            <h3 className="text-white">Error 404</h3>
            <h4 className="text-white  mt-4">
              The Requested page doesn't exist
            </h4>
          </div>
        </div>
      </section>
    </>
  );
}
