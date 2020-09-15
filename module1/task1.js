process.stdin.setEncoding('utf8');

process.stdin.on('readable',
    () => {
        let chunk;
        /* eslint-disable */
        while ((chunk = process.stdin.read()) !== null) {
            const arr = chunk.toString().split('').slice(0, -2).reverse().join('');
            process.stdout.write(`${arr}\n\n`);
        }
    }
);
