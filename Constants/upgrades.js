import { defaultUpgradeValues } from "./defaultValues.js"

function createUpgrades()
{
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent

    defaultUpgradeValues.forEach((obj) => {
        let html = template;

        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, obj[key])
        });
        upgradesContainer.innerHTML += html 
    })

}

createUpgrades()


export const upgrades = [
    {
        name: 'clicker',
        cost: document.querySelector('.clicker-cost'),
        parsedCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        increase: document.querySelector('.clicker-increase'),
        parsedIncrease: parseFloat(document.querySelector('.clicker-increase').innerHTML),
        level: document.querySelector('.clicker-level'),
        powerUps: 
        [
            {
                name: "2x clicker",
                description: "double your clicking power",
                multiplier: 2,
            },
            {
                name: "3x clicker",
                description: "triple your clicking power",
                multiplier: 3,
            },
            {
                name: "5x clicker",
                description: "quintuple your clicking power",
                multiplier: 5,
            },
        ],
        QuackMultiplier: 1.1,
        CostMultiplier: 1.5,
    },
    {
        name: 'bread',
        cost: document.querySelector('.bread-cost'),
        parsedCost: parseFloat(document.querySelector('.bread-cost').innerHTML),
        increase: document.querySelector('.bread-increase'),
        parsedIncrease: parseFloat(document.querySelector('.bread-increase').innerHTML),
        level: document.querySelector('.bread-level'),
        powerUps: 
        [
            {
                name: "2x bread",
                description: "double your bread output",
                multiplier: 2,
            },
            {
                name: "3x bread",
                description: "triple your bread output",
                multiplier: 3,
            },
            {
                name: "5x bread",
                description: "quintuple your bread output",
                multiplier: 5,
            },
        ],
        power: 0,
        QuackMultiplier: 1.1,
        CostMultiplier: 1.5,
    },
    {
        name: 'bakery',
        cost: document.querySelector('.bakery-cost'),
        parsedCost: parseFloat(document.querySelector('.bakery-cost').innerHTML),
        increase: document.querySelector('.bakery-increase'),
        parsedIncrease: parseFloat(document.querySelector('.bakery-increase').innerHTML),
        level: document.querySelector('.bakery-level'),
        powerUps: 
        [
            {
                name: "2x bakery",
                description: "double your bakery output",
                multiplier: 2,
            },
            {
                name: "3x bakery",
                description: "triple your bakery output",
                multiplier: 3,
            },
            {
                name: "5x bakery",
                description: "quintuple your bakery output",
                multiplier: 5,
            },
        ],
        power: 0,
        QuackMultiplier: 1.1,
        CostMultiplier: 1.5,
    },
    {
        name: 'feeder',
        cost: document.querySelector('.feeder-cost'),
        parsedCost: parseFloat(document.querySelector('.feeder-cost').innerHTML),
        increase: document.querySelector('.feeder-increase'),
        parsedIncrease: parseFloat(document.querySelector('.feeder-increase').innerHTML),
        level: document.querySelector('.feeder-level'),
        powerUps: 
        [
            {
                name: "2x feeder",
                description: "double your feeder efficiency",
                multiplier: 2,
            },
            {
                name: "3x feeder",
                description: "triple your feeder efficiency",
                multiplier: 3,
            },
            {
                name: "5x feeder",
                description: "quintuple your feeder efficiency",
                multiplier: 5,
            },
        ],
        power: 0,
        QuackMultiplier: 1.5,
        CostMultiplier: 2.5,
    },
]

export const powerUpIntervals = [10, 20, 50, 70, 100, 150, 200, 250, 300]