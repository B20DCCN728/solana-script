const solanaWeb3 =  require("@solana/web3.js");
const fs = require('fs');
const readline = require('readline');
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        gray: "\x1b[90m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        gray: "\x1b[100m",
        crimson: "\x1b[48m"
    }
};

// Generate Solana wallet
const generateWallet = async (quantity) => {
    const list = [];
    for(let i = 0; i < quantity; i++) {
        const keyPair = solanaWeb3.Keypair.generate();

        const publicKey = keyPair.publicKey.toString();
        const privateKey = Array.from(keyPair.secretKey)
                            .map(byte => byte.toString(16).padStart(2, '0'))
                            .join('');
        list.push({
            publicKey: publicKey,
            privateKey: privateKey,
        });           
    }
    return list;
};

// Write file
const writeFile = async (filePath, quantity) => {
    let content = JSON.stringify(await generateWallet(quantity), null, 2);

    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            console.log(colors.fg.green + 'Error writing to file:' + colors.reset, err);
            return;
        }
        console.log(colors.fg.green + 'Wallets successfully created: ' + filePath + colors.reset);
        console.log(colors.fg.green + 'File successfully written: ' + filePath + colors.reset);
    });
};

// Take input from keyboard
const askQuestion = (question) => new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    rl.question(`\x1b[32m${question}\x1b[0m`, (answer) => {
      rl.close();
      resolve(answer);
    });
});
  
// Main
(async () => {
    const filePath = 'solana-wallet.json';
    const quantity = await askQuestion('Enter number of wallets: ');
    await writeFile(filePath, quantity);
})();