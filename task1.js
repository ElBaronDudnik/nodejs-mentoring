process.stdin.setEncoding("utf8");

process.stdin.on("readable",
    () => {
        let chunk;
        while (null !== (chunk = process.stdin.read())) {
            const arr = chunk.toString().split('').slice(0, -2).reverse().join('');
            process.stdout.write(arr + '\n\n');
        }
    }
);