import React, { useEffect, useState } from 'react'
import { getAllHeroes } from 'api'
import { Card } from 'Atoms'
import useColumns from './useColumns'
import Table from './Table'

const columnArray = ['name', 'race', 'groupAffiliation', 'pic']
const renderData = {
  name: {
    displayName: 'Name',
    valueGetter: item => item.name,
  },
  race: {
    displayName: 'Species',
    valueGetter: item => item.appearance.race,
  },
  groupAffiliation: {
    displayName: 'Group Affiliation(s)',
    valueGetter: item => item.connections.groupAffiliation,
  },
  pic: {
    displayName: 'Image',
    valueGetter: item => <img src={item.images.xs} alt={item.name} />,
  },
}
const userData = {
  name: {
    width: 10,
    enabled: true,
  },
  race: {
    width: 25,
    enabled: true,
  },
  groupAffiliation: {
    width: 65,
    enabled: true,
  },
  pic: {
    width: 10,
    enabled: true,
  },
}

export const Ledger = props => {
  const [heroes, setHeroes] = useState()
  const [tableConfig, dispatch] = useColumns({ columnArray, renderData, userData })

  useEffect(() => {
    const fetchAllHeroes = async () => {
      try {
        const { data } = await getAllHeroes()
        setHeroes(data.sort(() => Math.random() - 0.5))
      } catch (e) {
        console.log(e)
      }
    }
    fetchAllHeroes()
  }, [])

  if (!heroes) {
    return null
  }
  return (
    <Card>
      <Table data={heroes} config={tableConfig} dispatch={dispatch} />
    </Card>
  )
}
