export const defaultUpgradeValues =
[
    { name: 'clicker', image: './Assets/Cursor.png', cost: 10, increase: 1, type: "upgrade" },
    { name: 'bread', image: './Assets/Bread.png', cost: 100, increase: 5, type: "upgrade" },
    { name: 'bakery', image: './Assets/Bakery.png', cost: 500, increase: 25, type: "upgrade"},
    { name: 'feeder', image: './Assets/Feeder.png', cost: 1000, increase: 50, type: "upgrade"},
]

export const defaultSkillValues = 
[
    {
    name: "double click", 
    image: "./Assets/Skills/Skill1.png",
    cd: 600,
    cost: 10000,
    type: "skill",
    },
    {
        name: "lucky day",
        image: "./Assets/Skills/Skill2.png",
        cd: 1000,
        cost: 100000,
        type: "skill",
    }
]

export const defaultArtifactValues =
[
    {
        name: "Beginner artifact",
        description: "Permanently increase increase all quacks gained by x amount",
        image: "./Assets/Artifacts/Artifact1.png",
        type: "artifact",
    }
]