import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";


const files: string[] = [];

function readJsFiles(folder: string) {
    fs.readdirSync(folder).forEach(file => {
        const abs = path.join(folder, file);
        if (fs.statSync(abs).isDirectory())
            return readJsFiles(abs);
        else if (abs.endsWith(".js"))
            return files.push(abs);
    });
}

readJsFiles("./dist/");


for (const f of files) {
    processFile(f);
}


async function processFile(filePath: string): Promise<void> {

    let writeArr: string[] = [];
    let wasModified = false;
    const readStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });
    rl.on("line", (line: string) => {
        if (line.startsWith("import ") && line.includes("from \".")) {
            if (line.endsWith(".js\";")) {
                readStream.destroy();
                rl.close();
                return;
            }
            const newLine = line.substring(0, line.length - 2) + ".js\";";
            wasModified = true;
            writeArr.push(newLine);
        } else {
            writeArr.push(line);
        }
    }).on("end", () => {

    }).on("close", (err: unknown) => {

        if (!wasModified)
            return;
        if (err !== undefined)
            console.log(err);
        rl.close();
        readStream.destroy();
        const writeStream = fs.createWriteStream(filePath);
        for (const line of writeArr)
            writeStream.write(line + "\r\n");
        writeStream.end();
    });
}


