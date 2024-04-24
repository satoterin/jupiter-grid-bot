import { LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { ArbBot, SwapToken } from './bot';
import dotenv from "dotenv";

dotenv.config({
    path: ".env",
});

const defaultConfig = {
    solanaEndpoint: clusterApiUrl("mainnet-beta"),
    jupiter: "https://public.jupiterapi.com",
};

async function main() {
    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY environment variable not set");
    }
    //let decodedSecretKey = Uint8Array.from(JSON.parse(process.env.SECRET_KEY));
    let decodedSecretKey = process.env.SECRET_KEY;
    const bot = new ArbBot({
        solanaEndpoint: process.env.SOLANA_ENDPOINT ?? defaultConfig.solanaEndpoint,
        metisEndpoint: process.env.METIS_ENDPOINT ?? defaultConfig.jupiter,
        secretKey: decodedSecretKey,
        firstTradePrice: 0.0167 * LAMPORTS_PER_SOL,
        targetGainPercentage: 2,
        initialInputToken: SwapToken.WIF,
        initialInputAmount: 20_000_000_000,          
    });

    await bot.init();

}

main().catch(console.error);