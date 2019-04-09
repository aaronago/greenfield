import React from 'react'
export const allHeroesTable = {
  columnArray: ['name', 'race', 'groupAffiliation', 'pic'],
  renderData: {
    name: {
      displayName: 'Name',
      valueGetter: item => item.name,
      sortPath: 'name',
    },
    race: {
      displayName: 'Species',
      valueGetter: item => item.appearance.race,
      sortPath: 'appearance.race',
    },
    groupAffiliation: {
      displayName: 'Group Affiliation(s)',
      valueGetter: item => item.connections.groupAffiliation,
      sortPath: 'connections.groupAffiliation',
    },
    pic: {
      displayName: 'Image',
      valueGetter: item => <img src={item.images.xs} alt={item.name} />,
      sortPath: 'name',
    },
  },
  userData: {
    name: {
      width: 100,
      enabled: true,
    },
    race: {
      width: 100,
      enabled: true,
    },
    groupAffiliation: {
      width: 600,
      enabled: true,
    },
    pic: {
      width: 80,
      enabled: true,
    },
  },
}
export const powerComparison = {
  columnArray: ['name', 'publisher', 'image', 'intelligence', 'strength', 'speed', 'durability'],
  renderData: {
    name: {
      displayName: 'Name',
      valueGetter: item => item.name,
      sortPath: 'name',
    },
    publisher: {
      displayName: 'Publisher',
      valueGetter: item => item.biography.publisher,
      sortPath: 'biography.publisher',
    },
    image: {
      displayName: 'Image',
      valueGetter: item => <img src={item.images.xs} alt={item.name} />,
      sortPath: 'name',
    },
    intelligence: {
      displayName: 'Smarts',
      valueGetter: item => item.powerstats.intelligence,
      sortPath: 'powerstats.intelligence',
    },
    strength: {
      displayName: 'strength',
      valueGetter: item => item.powerstats.strength,
      sortPath: 'powerstats.strength',
    },
    speed: {
      displayName: 'speed',
      valueGetter: item => item.powerstats.speed,
      sortPath: 'powerstats.speed',
    },
    durability: {
      displayName: 'durability',
      valueGetter: item => item.powerstats.durability,
      sortPath: 'powerstats.durability',
    },
  },
  userData: {
    name: {
      width: 100,
      enabled: true,
    },
    publisher: {
      width: 50,
      enabled: true,
    },
    image: {
      width: 150,
      enabled: true,
    },
    intelligence: {
      width: 150,
      enabled: true,
    },
    strength: {
      width: 150,
      enabled: true,
    },
    speed: {
      width: 150,
      enabled: false,
    },
    durability: {
      width: 150,
      enabled: false,
    },
  },
}
