const inputValidation = require("../utils/inputValidation");

test('Missing name', () => {
    expect(inputValidation({
        surname: "surname",
        email: "test@test.com",
        password: "password"
    })).toBe(false);
});

test('Missing surname', () => {
    expect(inputValidation({
        name: "name",
        email: "test@test.com",
        password: "password"
    })).toBe(false);
});

test('Missing e-mail', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        password: "password"
    })).toBe(false);
});

test('Missing password', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@test.com",
    })).toBe(false);
});

test('Missing surname and password', () => {
    expect(inputValidation({
        name: "name",
        email: "test@test.com",
    })).toBe(false);
});

test('Missing e-mail and name', () => {
    expect(inputValidation({
        surname: "surname",
        password: "password"
    })).toBe(false);
});

test('Missing everything', () => {
    expect(inputValidation({

    })).toBe(false);
});

test('Short password', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@test.com",
        password: "d3S"
    })).toBe(false);
});

test('Short password & no numbers', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@test.com",
        password: "daS"
    })).toBe(false);
});

test('Short password & no letters', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@test.com",
        password: "1234"
    })).toBe(false);
});

test('No numbers password', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@test.com",
        password: "Password"
    })).toBe(false);
});

test('No numbers & short password', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@test.com",
        password: "Pass"
    })).toBe(false);
});

test('No numbers & no letters password', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@test.com",
        password: "!=£$(%£)££"
    })).toBe(false);
});

test('No upper-case & short password', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@test.com",
        password: "p4ss"
    })).toBe(false);
});

test('No upper-case password', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@test.com",
        password: "p4ssw0rd"
    })).toBe(false);
});

test('Invalid email and password #1', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@test",
        password: "p4ssw0rd"
    })).toBe(false);
});

test('Invalid email and password #2', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "@gmail.com",
        password: "p4SSW"
    })).toBe(false);
});

test('Email invalid TLD #1', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@gmail.c",
        password: "p4Ssw0rd"
    })).toBe(false);
});

test('Email invalid TLD #2', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@gmail.2",
        password: "p4Ssw0rd"
    })).toBe(false);
});

test('Email missing @', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "testgmail.com",
        password: "p4Ssw0rd"
    })).toBe(false);
});

test('Email without TLD', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@gmail",
        password: "p4Ssw0rd"
    })).toBe(false);
});

test('Invalid email', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "testgmail",
        password: "p4Ssw0rd"
    })).toBe(false);
});

test('Ok #1', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "test@gmail.com",
        password: "p4Ssw0rd"
    })).toBe(true);
});

test('Ok #2', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "ok@dh.it",
        password: "FDSDD/73jJdaaa"
    })).toBe(true);
});

test('Ok #3', () => {
    expect(inputValidation({
        name: "name",
        surname: "surname",
        email: "rick@morty.gulp",
        password: "dsa73HSD&£"
    })).toBe(true);
});

test('Ok #4', () => {
    expect(inputValidation({
        name: "Riccardo",
        surname: "Nannini",
        email: "riccardo@mymail.it",
        password: "superSecret0"
    })).toBe(true);
});

test('Ok #5', () => {
    expect(inputValidation({
        name: "Elena",
        surname: "Mininni",
        email: "elena@mail.io",
        password: "14Ottobre2020"
    })).toBe(true);
});