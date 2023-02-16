#!/usr/bin/env node

import fs from "fs";
import { parse } from 'ts-command-line-args';
import path from "path";

import { encode } from "./encode_decode";
import { decode } from "./encode_decode";

function openFile(fileName: string): string {
    return fs.readFileSync('./'+fileName,'utf-8')
}

interface ICopyFilesArguments {
    file: string;
    mode: string;
    help?: boolean;
}

const args = parse<ICopyFilesArguments>(
    {
        file: { type: String, alias: 'f', description: 'The file\'s name with extension' },
        mode: { type: String, alias: 'm', description: 'Choose the encoder or decoder mode (d/e)' },
        help: { type: Boolean, optional: true, alias: 'h', description: 'Prints this usage guide' },
    },
    {
        helpArg: 'help',
        headerContentSections: [{ header: 'RLE (Run-Length Encoder/Decoder)', content: 'A standard RLE encoder/decoder' }],
        footerContentSections: [{ header: 'Applaudo Studios', content: `Copyright: Silvio Aguilar` }],
    },
);

const file = openFile(args.file)
const fileName = path.parse(args.file).name;

if (args.mode === 'e') {
    console.log(encode(file))
    fs.writeFile(fileName+'_encoded.txt', encode(file), (err) => {
        if (err)
            console.log(err);
    });
} else if (args.mode === 'd') {
    console.log(decode(file))
    fs.writeFile(fileName+'_decoded.txt', decode(file), (err) => {
        if (err)
            console.log(err);
    });
}

