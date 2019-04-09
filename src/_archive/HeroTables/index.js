import React, { useEffect, useState } from 'react'

import { getAllHeroes } from 'api'
import { Card } from 'Atoms'
import useColumns from 'Hooks/useColumns'
import Ledger from '../Ledger'

import * as tableConfigs from './tableConfigs'

export const HeroTables = props => {
  const [heroes, setHeroes] = useState()

  const { tableConfig, setTableConfig, sortState, setSortState } = useColumns(tableConfigs.powerComparison)

  useEffect(() => {
    const fetchAllHeroes = async () => {
      try {
        const { data } = await getAllHeroes()
        setHeroes(data.sort(() => Math.random() - 0.5).slice(0, 50))
      } catch (e) {
        console.log(e)
      }
    }
    fetchAllHeroes()
  }, [])

  if (!heroes) {
    return null
  }

  const handleRowClick = row => {
    window.alert(row.name)
  }

  return (
    <Card>
      <Ledger
        config={tableConfig}
        data={heroes}
        dispatch={setTableConfig}
        handleRowClick={handleRowClick}
        sort={sortState}
        sortBy={setSortState}
      />
    </Card>
  )
}
