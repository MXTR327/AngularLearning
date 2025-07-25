
function addNumbers(a: any, b: any)
{
    return a + b;
}

const addNumbersArrow = (a: number, b: number):string =>
{
    return `${ a + b }`;
}

function multiply(firstNumber:number, secondNumber?:number, base:number = 2)
{
    return firstNumber * base;
}

// const result:number = addNumbers(1, 2)
// const result2:string = addNumbersArrow(1, 2)
// const multiplyResult: number = multiply(5);
// console.log({result, result2, multiplyResult})

interface Character
{
    name: string;
    hp: number;
    showHP: () => any;
}

const healCharacter = (character: Character, amount: number) =>
{
    character.hp += amount;
}

const strider: Character =
{
    name: "Strider",
    hp: 50,
    showHP()
    {
        console.log(`puntos de vida ${this.hp}`);
    }
}

healCharacter( strider, 10)

strider.showHP();


export { };