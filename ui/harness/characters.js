module.exports = [
    {
        characterName: 'Topher',
        race: 'Half-Elf',
        size: 'Medium',
        alignment: 'Lawful Good',
        baseAttack: 2,
        initiative: 2,
        speed: 30,
        hp: {
            current: 10,
            max: 14,
        },
        classes: [
            {
                name: 'Monk',
                level: 3,
            },
        ],
        attributes: {
            STR: {
                base: 12,
                bonus: 1,
            },
            DEX: {
                base: 10,
                bonus: 0,
            },
            CON: {
                base: 8,
                bonus: -1,
            },
            INT: {
                base: 12,
                bonus: 1,
            },
            WIS: {
                base: 12,
                bonus: 1,
            },
            CHA: {
                base: 12,
                bonus: 1,
            },
        },
        saves: {
            Fortitude: 2,
            Reflex: 2,
            Will: 2,
        },
        armorClass: {
            current: 14,
            touch: 14,
            flatFooted: 12,
        },
        combatManeuvers: {
            bonus: 2,
            defense: 17,
        },
        skills: {
            Acrobatics: {
                total: 2,
            },
            Appraise: {
                total: 2,
            },
            Bluff: {
                total: 2,
            },
            Climb: {
                total: 2,
            },
            Diplomacy: {
                total: 2,
            },
            Disguise: {
                total: 2,
            },
            'Escape Artist': {
                total: 2,
            },
            Fly: {
                total: 2,
            },
            Heal: {
                total: 2,
            },
            Intimidate: {
                total: 2,
            },
            Perception: {
                total: 2,
            },
            Ride: {
                total: 2,
            },
            'Sense Motive': {
                total: 2,
            },
            Stealth: {
                total: 2,
            },
            Survival: {
                total: 2,
            },
            Swim: {
                total: 2,
            },
        },
        weapons: {
            'Unarmed Strike': {
                'Main Hand': {
                    toHit: [3],
                    damage: '1d6+1',
                },
                'Flurry': {
                    toHit: [2,2],
                    damage: '1d6+1',
                },
            },
            Longbow: {
                'Both Hands': {
                    toHit: [2],
                    damage: '1d8',
                },
            },
        },
        resources: {
            'Potion, Cure Light Wounds': {
                charges: 2,
            },
            'Deflect Arrows': {
                charges: 1,
                maxCharges: 1,
            },
            'Stunning Fist': {
                charges: 2,
                maxCharges: 3,
            },
        },
        abilities: [
            'Elf Blood',
            'Evasion',
        ],
    },
    {
        characterName: 'Morgana',
        race: 'Tiefling',
        size: 'Medium',
        alignment: 'Lawful Good',
        baseAttack: 2,
        initiative: 2,
        speed: 30,
        hp: {
            current: 14,
            max: 14,
        },
        classes: [
            {
                name: 'Summoner',
                level: 2,
            },
            {
                name: 'Barbarian',
                level: 1,
            },
        ],
        attributes: {
            STR: {
                base: 12,
                bonus: 1,
            },
            DEX: {
                base: 10,
                bonus: 0,
            },
            CON: {
                base: 8,
                bonus: -1,
            },
            INT: {
                base: 12,
                bonus: 1,
            },
            WIS: {
                base: 12,
                bonus: 1,
            },
            CHA: {
                base: 12,
                bonus: 1,
            },
        },
        saves: {
            Fortitude: 2,
            Reflex: 2,
            Will: 2,
        },
        armorClass: {
            current: 14,
            touch: 14,
            flatFooted: 12,
        },
        combatManeuvers: {
            bonus: 2,
            defense: 17,
        },
        skills: {
            Acrobatics: {
                total: 2,
            },
            Appraise: {
                total: 2,
            },
            Bluff: {
                total: 2,
            },
            Climb: {
                total: 2,
            },
            Diplomacy: {
                total: 2,
            },
            Disguise: {
                total: 2,
            },
            'Escape Artist': {
                total: 2,
            },
            Fly: {
                total: 2,
            },
            Heal: {
                total: 2,
            },
            Intimidate: {
                total: 2,
            },
            Perception: {
                total: 2,
            },
            Ride: {
                total: 2,
            },
            'Sense Motive': {
                total: 2,
            },
            Stealth: {
                total: 2,
            },
            Survival: {
                total: 2,
            },
            Swim: {
                total: 2,
            },
        },
        weapons: {
            'Unarmed Strike': {
                'Main Hand': {
                    toHit: [3],
                    damage: '1d6+1',
                },
                'Flurry': {
                    toHit: [2,2],
                    damage: '1d6+1',
                },
            },
            Longbow: {
                'Both Hands': {
                    toHit: [2],
                    damage: '1d8',
                },
            },
        },
        resources: {
            'Potion, Cure Light Wounds': {
                charges: 2,
            },
            'Deflect Arrows': {
                charges: 1,
                maxCharges: 1,
            },
            'Stunning Fist': {
                charges: 2,
                maxCharges: 3,
            },
        },
        abilities: [
            'Elf Blood',
            'Evasion',
        ],
    },
    {
        characterName: 'Eidy',
        race: 'Outsider',
        size: 'Medium',
        alignment: 'Lawful Good',
        baseAttack: 2,
        initiative: 2,
        speed: 30,
        hp: {
            current: 14,
            max: 14,
        },
        attributes: {
            STR: {
                base: 12,
                bonus: 1,
            },
            DEX: {
                base: 10,
                bonus: 0,
            },
            CON: {
                base: 8,
                bonus: -1,
            },
            INT: {
                base: 12,
                bonus: 1,
            },
            WIS: {
                base: 12,
                bonus: 1,
            },
            CHA: {
                base: 12,
                bonus: 1,
            },
        },
        saves: {
            Fortitude: 2,
            Reflex: 2,
            Will: 2,
        },
        armorClass: {
            current: 14,
            touch: 14,
            flatFooted: 12,
        },
        combatManeuvers: {
            bonus: 2,
            defense: 17,
        },
        skills: {
            Acrobatics: {
                total: 2,
            },
            Appraise: {
                total: 2,
            },
            Bluff: {
                total: 2,
            },
            Climb: {
                total: 2,
            },
            Diplomacy: {
                total: 2,
            },
            Disguise: {
                total: 2,
            },
            'Escape Artist': {
                total: 2,
            },
            Fly: {
                total: 2,
            },
            Heal: {
                total: 2,
            },
            Intimidate: {
                total: 2,
            },
            Perception: {
                total: 2,
            },
            Ride: {
                total: 2,
            },
            'Sense Motive': {
                total: 2,
            },
            Stealth: {
                total: 2,
            },
            Survival: {
                total: 2,
            },
            Swim: {
                total: 2,
            },
        },
        weapons: {
            'Unarmed Strike': {
                'Main Hand': {
                    toHit: [3],
                    damage: '1d6+1',
                },
                'Flurry': {
                    toHit: [2,2],
                    damage: '1d6+1',
                },
            },
            Longbow: {
                'Both Hands': {
                    toHit: [2],
                    damage: '1d8',
                },
            },
        },
        resources: {
            'Potion, Cure Light Wounds': {
                charges: 2,
            },
            'Deflect Arrows': {
                charges: 1,
                maxCharges: 1,
            },
            'Stunning Fist': {
                charges: 2,
                maxCharges: 3,
            },
        },
        abilities: [
            'Elf Blood',
            'Evasion',
        ],
    },
    {
        characterName: 'Ravyn',
        race: 'Human',
        size: 'Medium',
        alignment: 'Lawful Good',
        baseAttack: 2,
        initiative: 2,
        speed: 30,
        hp: {
            current: 14,
            max: 14,
        },
        classes: [
            {
                name: 'Witch',
                level: 2,
            }
        ],
        attributes: {
            STR: {
                base: 12,
                bonus: 1,
            },
            DEX: {
                base: 10,
                bonus: 0,
            },
            CON: {
                base: 8,
                bonus: -1,
            },
            INT: {
                base: 12,
                bonus: 1,
            },
            WIS: {
                base: 12,
                bonus: 1,
            },
            CHA: {
                base: 12,
                bonus: 1,
            },
        },
        saves: {
            Fortitude: 2,
            Reflex: 2,
            Will: 2,
        },
        armorClass: {
            current: 14,
            touch: 14,
            flatFooted: 12,
        },
        combatManeuvers: {
            bonus: 2,
            defense: 17,
        },
        skills: {
            Acrobatics: {
                total: 2,
            },
            Appraise: {
                total: 2,
            },
            Bluff: {
                total: 2,
            },
            Climb: {
                total: 2,
            },
            Diplomacy: {
                total: 2,
            },
            Disguise: {
                total: 2,
            },
            'Escape Artist': {
                total: 2,
            },
            Fly: {
                total: 2,
            },
            Heal: {
                total: 2,
            },
            Intimidate: {
                total: 2,
            },
            Perception: {
                total: 2,
            },
            Ride: {
                total: 2,
            },
            'Sense Motive': {
                total: 2,
            },
            Stealth: {
                total: 2,
            },
            Survival: {
                total: 2,
            },
            Swim: {
                total: 2,
            },
        },
        weapons: {
            'Unarmed Strike': {
                'Main Hand': {
                    toHit: [3],
                    damage: '1d6+1',
                },
                'Flurry': {
                    toHit: [2,2],
                    damage: '1d6+1',
                },
            },
            Longbow: {
                'Both Hands': {
                    toHit: [2],
                    damage: '1d8',
                },
            },
        },
        resources: {
            'Potion, Cure Light Wounds': {
                charges: 2,
            },
            'Deflect Arrows': {
                charges: 1,
                maxCharges: 1,
            },
            'Stunning Fist': {
                charges: 2,
                maxCharges: 3,
            },
        },
        abilities: [
            'Elf Blood',
            'Evasion',
        ],
    },
    {
        characterName: 'Nym',
        race: 'Elf',
        size: 'Medium',
        alignment: 'Lawful Good',
        baseAttack: 2,
        initiative: 2,
        speed: 30,
        hp: {
            current: 14,
            max: 14,
        },
        classes: [
            {
                name: 'Ranger',
                level: 2,
            }
        ],
        attributes: {
            STR: {
                base: 12,
                bonus: 1,
            },
            DEX: {
                base: 10,
                bonus: 0,
            },
            CON: {
                base: 8,
                bonus: -1,
            },
            INT: {
                base: 12,
                bonus: 1,
            },
            WIS: {
                base: 12,
                bonus: 1,
            },
            CHA: {
                base: 12,
                bonus: 1,
            },
        },
        saves: {
            Fortitude: 2,
            Reflex: 2,
            Will: 2,
        },
        armorClass: {
            current: 14,
            touch: 14,
            flatFooted: 12,
        },
        combatManeuvers: {
            bonus: 2,
            defense: 17,
        },
        skills: {
            Acrobatics: {
                total: 2,
            },
            Appraise: {
                total: 2,
            },
            Bluff: {
                total: 2,
            },
            Climb: {
                total: 2,
            },
            Diplomacy: {
                total: 2,
            },
            Disguise: {
                total: 2,
            },
            'Escape Artist': {
                total: 2,
            },
            Fly: {
                total: 2,
            },
            Heal: {
                total: 2,
            },
            Intimidate: {
                total: 2,
            },
            Perception: {
                total: 2,
            },
            Ride: {
                total: 2,
            },
            'Sense Motive': {
                total: 2,
            },
            Stealth: {
                total: 2,
            },
            Survival: {
                total: 2,
            },
            Swim: {
                total: 2,
            },
        },
        weapons: {
            'Unarmed Strike': {
                'Main Hand': {
                    toHit: [3],
                    damage: '1d6+1',
                },
                'Flurry': {
                    toHit: [2,2],
                    damage: '1d6+1',
                },
            },
            Longbow: {
                'Both Hands': {
                    toHit: [2],
                    damage: '1d8',
                },
            },
        },
        resources: {
            'Potion, Cure Light Wounds': {
                charges: 2,
            },
            'Deflect Arrows': {
                charges: 1,
                maxCharges: 1,
            },
            'Stunning Fist': {
                charges: 2,
                maxCharges: 3,
            },
        },
        abilities: [
            'Elf Blood',
            'Evasion',
        ],
    },
    {
        characterName: 'Nightshade',
        size: 'Large',
        alignment: 'True Neutral',
        baseAttack: 2,
        initiative: 2,
        speed: 30,
        hp: {
            current: 14,
            max: 14,
        },
        attributes: {
            STR: {
                base: 12,
                bonus: 1,
            },
            DEX: {
                base: 10,
                bonus: 0,
            },
            CON: {
                base: 8,
                bonus: -1,
            },
            INT: {
                base: 12,
                bonus: 1,
            },
            WIS: {
                base: 12,
                bonus: 1,
            },
            CHA: {
                base: 12,
                bonus: 1,
            },
        },
        saves: {
            Fortitude: 2,
            Reflex: 2,
            Will: 2,
        },
        armorClass: {
            current: 12,
            touch: 12,
            flatFooted: 12,
        },
        combatManeuvers: {
            bonus: 2,
            defense: 17,
        },
        skills: {
            Acrobatics: {
                total: 2,
            },
            Appraise: {
                total: 2,
            },
            Bluff: {
                total: 2,
            },
            Climb: {
                total: 2,
            },
            Diplomacy: {
                total: 2,
            },
            Disguise: {
                total: 2,
            },
            'Escape Artist': {
                total: 2,
            },
            Fly: {
                total: 2,
            },
            Heal: {
                total: 2,
            },
            Intimidate: {
                total: 2,
            },
            Perception: {
                total: 2,
            },
            Ride: {
                total: 2,
            },
            'Sense Motive': {
                total: 2,
            },
            Stealth: {
                total: 2,
            },
            Survival: {
                total: 2,
            },
            Swim: {
                total: 2,
            },
        },
        abilities: [
            'Horse',
        ],
    },
]
