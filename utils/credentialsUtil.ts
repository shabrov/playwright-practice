export function generateRandomPassword() {
    return `Pass@${Date.now()}`;
}

export function generateWrongEmailFormat() {
    return `test-email${Date.now()}`;
}

export function generateRandomEmail() {
    return `test-email${Date.now()}@gmail.com`;
}