import Warning from '../assets/images/warning.png';

export default function Error404() {
  return (
    <>
      <section className="main">
        <div>
          <div className="error-glass text-center">
            <img className="error-img mb-4" src={Warning} alt="Done" />
            <h3 className="text-white">Error 404</h3>
            <h4 className="text-white mt-4">The Requested page doesn't exist</h4>
          </div>
        </div>
      </section>
    </>
  );
}
