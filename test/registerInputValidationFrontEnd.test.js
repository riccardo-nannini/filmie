const inputValidation = require("../../client/src/register/inputValidation");

test('Short password', () => {
    expect(inputValidation("test@test.com", "p4SS")[1]).toBe(false);
});

test('Short password & no number', () => {
    expect(inputValidation("test@test.com", "paSS")[1]).toBe(false);
});

test('Short password & all lower-case', () => {
    expect(inputValidation("test@test.com", "pass")[1]).toBe(false);
});

test('No numbers & short password', () => {
    expect(inputValidation("test@test.com", "paSS")[1]).toBe(false);
});

test('No numbers & all upper-case & short password', () => {
    expect(inputValidation("test@test.com", "PASS")[1]).toBe(false);
});

test('No numbers', () => {
    expect(inputValidation("test@test.com", "PASSword")[1]).toBe(false);
});

test('No upper-case & short password', () => {
    expect(inputValidation("test@test.com", "p4ss")[1]).toBe(false);
});

test('No upper-case & no number', () => {
    expect(inputValidation("test@test.com", "password")[1]).toBe(false);
});

test('No upper-case', () => {
    expect(inputValidation("test@test.com", "password01")[1]).toBe(false);
});

test('No letters', () => {
    expect(inputValidation("test@test.com", "1234567890")[1]).toBe(false);
});

test('No letters & short password', () => {
    expect(inputValidation("test@test.com", "12345")[1]).toBe(false);
});

test('Invalid email & short password', () => {
    expect(inputValidation("test@test", "dsa6A")[1]).toBe(false);
});

test('Invalid email & no number password', () => {
    expect(inputValidation("test@test", "Password")[1]).toBe(false);
});

test('Email without TLD', () => {
    expect(inputValidation("test@test", "P4ssword")[1]).toBe(false);
});

test('Email without @', () => {
    expect(inputValidation("testgmail.com", "P4ssword")[1]).toBe(false);
});

test('Email with invalid TLD', () => {
    expect(inputValidation("test@gmail.1", "P4ssword")[1]).toBe(false);
});

test('Email with invalid TLD #2', () => {
    expect(inputValidation("test@gmail.w", "P4ssword")[1]).toBe(false);
});

test('Email with invalid TLD #3', () => {
    expect(inputValidation("test@gmail.#", "P4ssword")[1]).toBe(false);
});

test('Invalid email', () => {
    expect(inputValidation("fake-email", "P4ssword")[1]).toBe(false);
});

test('Ok #1', () => {
    expect(inputValidation("riccardo@gmail.com", "P4ssword")[1]).toBe(true);
});

test('Ok #2', () => {
    expect(inputValidation("riccardo@mail.it", "P4ssword021")[1]).toBe(true);
});

test('Ok #3', () => {
    expect(inputValidation("riccardo@yahoo.com", "432j2_aAd")[1]).toBe(true);
});

test('Ok #4', () => {
    expect(inputValidation("riccardo@gmail.com", "sds6D_!ds?jj|d!JD89921")[1]).toBe(true);
});