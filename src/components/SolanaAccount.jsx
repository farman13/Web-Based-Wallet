import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

function SolanaAccount({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    async function SolWalletGenerator() {
        const seed = await mnemonicToSeed(mnemonic);
        console.log(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        console.log(derivedSeed);
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex => currentIndex + 1);
        setPublicKeys([...publicKeys, { privateKey: secret, publicKey: keypair.publicKey }]);
    }
    return (
        <div className="p-4 bg-white shadow-md rounded-lg ">
            <div className="m-2 flex items-center">
                <div className="text-2xl font-semibold">Solana Wallet</div>
                <button className="text-white bg-red-500 p-2 ml-4 rounded disabled:opacity-50" onClick={SolWalletGenerator} disabled={!mnemonic}>Add ETH wallet</button>
            </div>
            {publicKeys.map((wallet, index) => (
                <div key={index} className="bg-slate-50 p-4 my-2 rounded-lg">
                    <div className="font-ligt text-sm">
                        <strong>Public Key:</strong> {wallet.publicKey.toBase58()} <br />
                        <strong>Private Key:</strong> {wallet.privateKey}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default SolanaAccount;

