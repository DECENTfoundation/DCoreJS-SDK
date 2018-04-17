import { BaseBuffer } from "./BaseBuffer";

export class BaseUtils {

    public static 2(): BaseBuffer {
        return new BaseBuffer("01");
    }

    public static 8(): BaseBuffer {
        return new BaseBuffer("01234567");
    }

    public static 11(): BaseBuffer {
        return new BaseBuffer("0123456789a");
    }

    public static 16(): BaseBuffer {
        return new BaseBuffer("0123456789abcdef");
    }

    public static 32(): BaseBuffer {
        return new BaseBuffer("0123456789ABCDEFGHJKMNPQRSTVWXYZ");
    }

    public static 36(): BaseBuffer {
        return new BaseBuffer("0123456789abcdefghijklmnopqrstuvwxyz");
    }

    public static 58(): BaseBuffer {
        return new BaseBuffer("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
    }

    public static 62(): BaseBuffer {
        return new BaseBuffer("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    public static 64(): BaseBuffer {
        return new BaseBuffer("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
    }

    public static 66(): BaseBuffer {
        return new BaseBuffer("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~");
    }
}
