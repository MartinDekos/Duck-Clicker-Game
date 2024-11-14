import { defaultValues } from "./defaultValues.js"

function createUpgrades()
{
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent

    defaultValues.forEach((obj) => {
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
        QuackMultiplier: 1.1,
        CostMultiplier: 2,
    },
    {
        name: 'bread',
        cost: document.querySelector('.bread-cost'),
        parsedCost: parseFloat(document.querySelector('.bread-cost').innerHTML),
        increase: document.querySelector('.bread-increase'),
        parsedIncrease: parseFloat(document.querySelector('.bread-increase').innerHTML),
        level: document.querySelector('.bread-level'),
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
        QuackMultiplier: 1.5,
        CostMultiplier: 2.5,
    },
]

console.log(upgrades[0].name)
