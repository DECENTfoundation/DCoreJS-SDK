export class VoteId {
    public static parse(vote: string) {
        if (this.regexp.test(vote)) {
            const [type, id] = vote.split(":");
            return new VoteId(+type, +id);
        } else {
            throw TypeError("not a valid vote");
        }
    }

    private static regexp = /^[0-9]+:[0-9]+$/;

    public type: number;
    public id: number;

    private constructor(type: number, id: number) {
        this.type = type;
        this.id = id;
    }

    public toString() {
        return `${this.type}:${this.id}`;
    }
}
