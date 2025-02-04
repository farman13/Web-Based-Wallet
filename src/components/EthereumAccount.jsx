import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

function EthereumAccount({ mnemonic }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    async function EthWalletGenereator() {
        console.log(mnemonic);
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        setCurrentIndex(currentIndex => currentIndex + 1);
        setAddresses([...addresses, { privateKey: privateKey, publicKey: wallet.address }]);
    }
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="m-2 flex">
                <div className="text-2xl font-semibold">Ethereum Wallet</div>
                <button className="text-white bg-red-500 p-2 ml-4 rounded disabled:opacity-50" onClick={EthWalletGenereator} disabled={!mnemonic}>Add ETH wallet</button>
            </div>
            {addresses.map((wallet, index) => (
                <div key={index} className="bg-slate-50 p-4 my-2 rounded-lg">
                    <div className="font-ligth text-md">
                        <strong>Public Key:</strong> {wallet.publicKey} <br />
                        <strong>Private Key:</strong> {wallet.privateKey}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default EthereumAccount;