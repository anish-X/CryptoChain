import styles from "./Navbar.module.css"
const Navbar = () => {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.heading}>CryptoChain</h1>
        <button className={styles.btnSimulation}>Try Simulation</button>
      </div>
    </>
  );
};

export default Navbar;
