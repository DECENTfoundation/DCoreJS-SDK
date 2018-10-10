import { Utils } from "../utils/Utils";

import { SeedDictionary } from "./dictionaries/SeedDictionary";

export class Passphrase {

    public static generate(count: number = Passphrase.WORD_COUNT): Passphrase {
        return new Passphrase(Utils.generateEntropy(), SeedDictionary.default, count);
    }

    private static WORD_COUNT = 16;

    public readonly words: string[];

    public constructor(entropy: Buffer, seed: string[], count: number) {
        this.words = this.create(entropy, seed, count);
    }

    public toString(): string {
        return this.words.join(" ").trim().split(/[\t\n\v\f\r ]+/).join(" ");
    }

    private create(entropy: Buffer, seed: string[], count: number): string[] {
        const end = count * 2; const phrases = [];
        for (let i = 0; i < end; i += 2) {

            // randomBuffer has 256 bits / 16 bits per word == 16 words
            // tslint:disable-next-line:no-bitwise
            const num = (entropy[i] << 8) + entropy[i + 1];

            // convert into a number between 0 and 1 (inclusive)
            const multiplier = num / Math.pow(2, 16);
            const index = Math.round(seed.length * multiplier);

            phrases.push(seed[index]);
        }

        return phrases;
    }
}
