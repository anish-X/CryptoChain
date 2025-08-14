import { useState } from "react";
import "./Mining.css";

const MiningStatus = ({ 
  blockchain, 
  onMineComplete, 
  isVisible = false 
}) => {
  const [isMining, setIsMining] = useState(false);
  const [miningProgress, setMiningProgress] = useState(0);
  const [currentNonce, setCurrentNonce] = useState(0);
  const [hashRate, setHashRate] = useState(0);


  const simulateMining = async () => {
    if (blockchain.pendingTransaction.length === 0) {
        alert("No pending transactions to mine!");
        return;
    }

    setIsMining(true);
    setMiningProgress(0);
    setCurrentNonce(0);
    
    const prevHash = blockchain.chain[blockchain.chain.length - 1].hash;
    const totalHashes = 100000; // for progress estimation (optional)
    let lastNonce = 0;

    const updateNonce = (nonce) => {
        lastNonce = nonce;
        setCurrentNonce(nonce);

        // approximate progress (optional)
        setMiningProgress(Math.min((nonce / totalHashes) * 100, 95));
        const elapsed = (Date.now() - startTime) / 1000;
        setHashRate(Math.floor(nonce / elapsed));
    };

    const startTime = Date.now();

    // Mining in a separate promise to not block UI
    try {
        const nonce = await new Promise((resolve) => {
            setTimeout(() => {
                const foundNonce = blockchain.proofOfWork(updateNonce);
                resolve(foundNonce);
            }, 50); // slight delay to allow UI update
        });

        // Once nonce is found, create block
        blockchain.mine();

        setMiningProgress(100);
        setCurrentNonce(nonce);

        setTimeout(() => {
            setIsMining(false);
            onMineComplete();
        }, 500);

    } catch (error) {
        setIsMining(false);
        alert(`Mining failed: ${error.message}`);
    }
};


//   const simulateMining = async () => {
//     if (blockchain.pendingTransaction.length === 0) {
//       alert("No pending transactions to mine!");
//       return;
//     }

//     setIsMining(true);
//     setMiningProgress(0);
//     setCurrentNonce(0);
    
//     const startTime = Date.now();
    
//     // Simulate the mining process with visual feedback
//     const miningInterval = setInterval(() => {
//       setCurrentNonce(prev => {
//         const newNonce = prev + Math.floor(Math.random() * 1000) + 500;
//         const elapsed = (Date.now() - startTime) / 1000;
//         setHashRate(Math.floor(newNonce / elapsed));
//         return newNonce;
//       });
      
//       setMiningProgress(prev => {
//         const newProgress = prev + Math.random() * 5;
//         return newProgress > 95 ? 95 : newProgress;
//       });
//     }, 100);

//     // Simulate mining delay (1-3 seconds)
//     const miningDelay = 1000 + Math.random() * 2000;
    
//     setTimeout(() => {
//       clearInterval(miningInterval);
      
//       try {
//         blockchain.mine();
//         setMiningProgress(100);
        
//         setTimeout(() => {
//           setIsMining(false);
//           onMineComplete();
//         }, 500);
        
//       } catch (error) {
//         setIsMining(false);
//         alert(`Mining failed: ${error.message}`);
//       }
//     }, miningDelay);
//   };

  if (!isVisible && !isMining) return null;

  return (
    <div className="miningContainer">
      <div className="miningHeader">
        <h3 className="miningTitle">
          {isMining ? "Mining in Progress..." : "Mining Status"}
        </h3>
      </div>

      <div className="miningStats">
        <div className="statCard">
          <span className="statLabel">Pending Transactions</span>
          <span className="statValue">{blockchain.pendingTransaction.length}</span>
        </div>
        
        <div className="statCard">
          <span className="statLabel">Difficulty</span>
          <span className="statValue">{blockchain.difficulty}</span>
        </div>
        
        <div className="statCard">
          <span className="statLabel">Current Block</span>
          <span className="statValue">#{blockchain.chain.length}</span>
        </div>
        
        <div className="statCard">
          <span className="statLabel">Hash Rate</span>
          <span className="statValue">{hashRate.toLocaleString()} H/s</span>
        </div>
      </div>

      {isMining && (
        <div className="miningProgress">
          <div className="progressInfo">
            <span>Finding valid hash...</span>
            <span>{miningProgress.toFixed(1)}%</span>
          </div>
          <div className="progressBar">
            <div 
              className="progressFill" 
              style={{ width: `${miningProgress}%` }}
            ></div>
          </div>
          <div className="nonceInfo">
            <span>Current Nonce: {currentNonce}</span>
            <span className="hashingAnimation">Hashing...</span>
          </div>
        </div>
      )}

      <div className="miningActions">
        <button 
          className="startMiningButton"
          onClick={simulateMining}
          disabled={isMining || blockchain.pendingTransaction.length === 0}
        >
          {isMining ? "Mining..." : "Start Mining"}
        </button>
        
        <div className="miningInfo">
          <p>
            Mining will process all pending transactions and create a new block.
            The proof-of-work algorithm requires finding a hash that starts with {blockchain.difficulty} zeros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiningStatus;