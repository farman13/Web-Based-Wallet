import { useState } from 'react'
import './App.css' // installing npm install vite-plugin-node-polyfills to use nodejs methods.
import { generateMnemonic } from "bip39";     // it is used to generate mnemonic      
import SolanaAccount from "./components/SolanaAccount";
import EthereumAccount from "./components/EthereumAccount";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  function GenerateMnemonic() {
    const mn = generateMnemonic();
    setMnemonic(mn);
    console.log(mn);
  }

  return (
    <div className='min-h-screen bg-slate-200 flex flex-col items-center justify-start overflow-y-auto'>
      <div className='text-center mt-8'>
        <div className='font-bold text-4xl mb-4'>Generate Your Web Based Wallets</div>
        <button className='font-light text-2xl border-2 border-gray-400 rounded-lg p-4 mb-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-900 transition duration-300 shadow-lg' onClick={GenerateMnemonic}>Create Seed Phrase</button>
        <p className='text-lg text-gray-700 bg-white p-4 rounded-lg shadow-md'><strong>Secret Phase : </strong> {mnemonic}</p>
      </div>
      <div className='mt-8 w-5/6 space-y-4'>
        <EthereumAccount mnemonic={mnemonic} />
        <SolanaAccount mnemonic={mnemonic} />
      </div>
    </div>
  )
}

export default App
