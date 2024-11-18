import { randomBytes } from 'crypto';

function generateSecureString(length: number): string {
    return randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

const secureString = generateSecureString(64);
console.log(secureString);