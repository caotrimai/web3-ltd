import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWallets } from '../../redux/walletSlice';
import web3Client, { initWeb3 } from '../../Web3Client';

export default function Wallet () {
  const dispatch = useDispatch();
  const { wallets } = useSelector((state) => state.wallet);
  const DEFAULT_AMOUNT_WALLET = 2;
  const [state, setState] = useReducer(
    (state, newStates) => ({ ...state, ...newStates }),
    {
      amountWallet: DEFAULT_AMOUNT_WALLET,
    },
    undefined,
  );
  const { amountWallet } = state;

  const handleCreateClick = () => {
    const wallets = web3Client.createWallets(amountWallet);
    if (wallets.length > 0) {
      const walletsObject = wallets.map(
        ({ address, privateKey }) => ({ address, privateKey }));
      dispatch(addWallets(walletsObject));
    }
  };

  useEffect(() => {
    initWeb3()
  },[])

  const walletList = (
    <div>
      {wallets.map(({ address, privateKey }, index) => (
        <div key={index}>
          <p>
            {`Address: ${address}`}
          </p>
          {`Private key: ${privateKey}`}
        </div>
      ))}
    </div>
  );

  const getFileName = () => {
    const now = new dayjs();
    return `wallet-${now.format('YYYY_MM_DD__HH_mm_ss.SSS')}.pdf`;
  };

  const handlePrintClick = () => {
    const text = wallets.map(
      ({
        address,
        privateKey,
      }) => `
      Address:
       ${address}\n
       Private key:
       ${privateKey}
       `,
    ).join('\n\n');
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.text(text, 10, 10);
    doc.save(getFileName());
  };

  const handleAmountChange = (e) => {
    e && e.preventDefault() && e.stopPropagation();
    const amount = Math.floor(e.target.value);
    setState({ amountWallet: amount });
  };

  return (
    <div className='Wallet'>
      Số lượng
      <input type='number' value={amountWallet} onChange={handleAmountChange} />
      {walletList}
      <button onClick={handleCreateClick}>Tạo ví</button>
      <button onClick={handlePrintClick}>Download</button>
    </div>
  );
}