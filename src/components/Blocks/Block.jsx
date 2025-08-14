// import styles from "./Block.module.css";

// const Block = ({ block }) => {
//   //   const [blocks] = useState([
//   //     {
//   //       id: 1,
//   //       title: "Block 1",
//   //       subtitle: "",
//   //       hash: "000e27ae69d03f71681ae3f9f2c6e20e16df7352ed7ea8d81aca0f5d42c379a6",
//   //       previousHash:
//   //         "351069db29c820cfab2972ea724d7dde6e8cb26c8306fbcc1e0dcb908ef0599e",
//   //       markelRoot:
//   //         "3cc6f2806000f3eceb26becba2d10c850ce535f031a67611275f1e5e657fd27c",
//   //       timestamp: 1754997351,
//   //       dateTime: "5:00:51 PM",
//   //       nonce: 818,
//   //       transactions: 1,
//   //       isGenesis: false,
//   //     }
//   //   ]);

//   return (
//     <>
//       <div className={styles.blockContainer}>
//         <div
//           style={{
//             position: "relative",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >

//           <div className={styles.block}>
//             <div className={styles.title}>
//               {block.title}
//               {block.subtitle && (
//                 <span className={styles.subtitle}>{block.subtitle}</span>
//               )}
//             </div>

//             <div className={styles.fieldLabel}>Hash:</div>
//             <div className={styles.fieldValue}>{block.hash}</div>

//             <div className={styles.fieldLabel}>Previous Hash:</div>
//             <div className={styles.fieldValue}>{block.previousHash}</div>

//             <div className={styles.fieldLabel}>Merkel Root:</div>
//             <div className={styles.fieldValue}>{block.markelRoot}</div>

//             <div className={styles.row}>
//               <div className={styles.column}>
//                 <div className={styles.fieldLabel}>Timestamp:</div>
//                 <div className={styles.fieldValue}>{block.timestamp}</div>
//               </div>
//               <div className={styles.column}>
//                 <div className={styles.fieldLabel}>DateTime:</div>
//                 <div className={styles.fieldValue}>{block.dateTime}</div>
//               </div>
//             </div>

//             <div className={styles.row}>
//               <div className={styles.column}>
//                 <div className={styles.fieldLabel}>Nonce:</div>
//                 <div className={styles.fieldValue}>{block.nonce}</div>
//               </div>
//               <div className={styles.column}>
//                 <div className={styles.fieldLabel}>Transactions:</div>
//                 <div className={styles.fieldValue}>{block.transactions}</div>
//               </div>
//             </div>
//           </div>

//           {/* {index < blocks.length - 1 && <div className={styles.arrow}></div>} */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Block;

import styles from "./Block.module.css";

const Block = ({ block }) => {
  return (
    <div className={styles.blockContainer}>
      <h3 className={styles.blockTitle}>Block #{block.index}</h3>
      
      <div className={styles.blockInfo}>
        <div className={styles.infoRow}>
          <strong>Hash:</strong> 
          <span className={styles.hashText}>{block.hash}</span>
        </div>
        
        <div className={styles.infoRow}>
          <strong>Previous Hash:</strong> 
          <span className={styles.hashText}>{block.prevHash}</span>
        </div>
        
        <div className={styles.infoRow}>
          <strong>Merkle Root:</strong> 
          <span className={styles.hashText}>{block.merkleRoot}</span>
        </div>
        
        <div className={styles.infoRow}>
          <strong>Nonce:</strong> 
          <span>{block.nonce}</span>
        </div>
        
        <div className={styles.infoRow}>
          <strong>Timestamp:</strong> 
          <span>{new Date(block.timestamp * 1000).toLocaleString()}</span>
        </div>
      </div>

      <div className={styles.transactionsSection}>
        <h4 className={styles.transactionTitle}>
          Transactions ({block.transactions.length})
        </h4>
        
        {block.transactions.length === 0 ? (
          <p className={styles.noTransactions}>No transactions in this block</p>
        ) : (
          <div className={styles.transactionsList}>
            {block.transactions.map((txn, index) => (
              <div key={txn.txn_id || index} className={styles.transaction}>
                <div className={styles.txnRow}>
                  <strong>ID:</strong> {txn.txn_id}
                </div>
                <div className={styles.txnRow}>
                  <strong>From:</strong> 
                  <span className={styles.address}>
                    {txn.sender === "SYSTEM" ? "SYSTEM" : `${txn.sender.substring(0,60)}...`}
                  </span>
                </div>
                <div className={styles.txnRow}>
                  <strong>To:</strong> 
                  <span className={styles.address}>
                    {txn.recipient.substring(0,60 )}...
                  </span>
                </div>
                <div className={styles.txnRow}>
                  <strong>Amount:</strong> {txn.amount}
                </div>
                {txn.signature && (
                  <div className={styles.txnRow}>
                    <strong>Signature:</strong> 
                    <span className={styles.signature}>
                      {txn.signature.substring(0, 60)}...
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Block;
