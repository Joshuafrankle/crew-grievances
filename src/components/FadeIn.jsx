import { motion } from "framer-motion";

function FadeIn({ children, duration = 2.5 }) {
  const easing = [0.6, -0.05, 0.01, 0.99]; //keyframes
  const fadeIn = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: duration,
        ease: easing,
      },
    },
  };

  return (
    <>
      <motion.div exit="exit" initial="initial" animate="animate">
        <motion.div variants={fadeIn}>{children}</motion.div>
      </motion.div>
    </>
  );
}

export default FadeIn;
