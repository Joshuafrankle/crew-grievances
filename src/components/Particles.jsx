import ParticlesBg from "particles-bg";

function Particles() {
  let config = {
    num: [1, 2],
    rps: 0.5,
    radius: [100, 200],
    life: [1.5, 2],
    v: [0.2, 0.5],
    tha: [-40, 40],
    alpha: [2, 1],
    scale: [0.1, 0.4],
    position: "all",
    color: ["#15e6ca", "#16baa4"],
    cross: "dead",
    random: 15,
  };

  return (
    <>
      <ParticlesBg type="custom" config={config} bg={true} />
    </>
  );
}

export default Particles;
