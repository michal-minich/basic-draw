import * as fs from "fs";
import * as readline from "readline";

let counter = 0;
let processing: string[] = [];
console.log("TS-JS import rewriter running");

fs.watch(
    "./dist/",
    { recursive: true },
    handleFileEvent);


function handleFileEvent(e: "rename" | "change", f: string) {

    const c = ++counter;

    const filePath = "./dist/" + justFileName(f);

    console.log(`${c}) ----------- File "${filePath}"`);

    if (!filePath.endsWith(".js")) {
        console.log(`${c}) Skipping - non .js file`);
        return;
    }

    if (e === "rename") {
        console.log(`${c}) Skipping - rename`);
        return;
    }

    if (processing.includes(filePath)) {
        console.log(`${c}) Skipping - already processing this file`);
        return;
    }

    console.log(`${c}) Processing`);

    processFile(filePath, c);
}


async function processFile(filePath: string, c: number): Promise<void> {
    processing.push(filePath);
    await sleep(100, c);
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
                console.log(c + ") Imports already processed");
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
        console.log(c + ") On end");
        end();
    }).on("close", (err: unknown) => {
        if (!wasModified) {
            console.log(c + ") Not modified");
            end();
            return;
        }
        if (err !== undefined) {
            console.log(err);
        }
        console.log(c + ") On close");
        rl.close();
        readStream.destroy();
        const writeStream = fs.createWriteStream(filePath);
        console.log(c + `) Writing ${writeArr.length} lines`);
        for (const line of writeArr) {
            writeStream.write(line + "\r\n");
        }
        writeArr = [];
        writeStream.end();
        end();
        console.log(c + ") Writing done");
    });

    function end() {
        processing.splice(processing.indexOf(filePath), 1);
        wasModified = false;
        if (processing.length === 0 && counter >= 100)
            counter = 0;
    }
}


export async function sleep(durationMs: number, c: number) {
    console.log(`${c}) Sleep: ${durationMs}ms`);
    return new Promise(resolve => { setTimeout(resolve, durationMs); });
}


function justFileName(filePath: string): string {
    const lastSlash = filePath.lastIndexOf("/");
    return lastSlash === -1 ? filePath : filePath.substring(lastSlash);
}
