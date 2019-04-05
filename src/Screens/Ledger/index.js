import React, { useEffect, useState, useReducer } from 'react'
import orderBy from 'lodash-es/orderBy'
import { getAllHeroes } from 'api'
import { Card } from 'Atoms'
import useColumns from './useColumns'
import Table from './Table'

const columnArray = ['name', 'race', 'groupAffiliation', 'pic']
const renderData = {
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
}
const userData = {
  name: {
    width: 300,
    enabled: true,
  },
  race: {
    width: 300,
    enabled: true,
  },
  groupAffiliation: {
    width: 300,
    enabled: true,
  },
  pic: {
    width: 300,
    enabled: true,
  },
}

const initialSortState = {
  key: '',
  dir: 'asc',
}

const sortReducer = (state, { key }) => {
  return {
    key,
    dir: state.dir === 'asc' ? 'desc' : 'asc',
  }
}

export const Ledger = props => {
  const [heroes, setHeroes] = useState()
  const [sort, setSort] = useReducer(sortReducer, initialSortState)
  const [tableConfig, dispatch] = useColumns({ columnArray, renderData, userData })

  useEffect(() => {
    const fetchAllHeroes = async () => {
      try {
        const { data } = await getAllHeroes()
        setHeroes(data.sort(() => Math.random() - 0.5).slice(0, 5))
      } catch (e) {
        console.log(e)
      }
    }
    fetchAllHeroes()
  }, [])

  if (!heroes) {
    return null
  }
  console.log(sort)

  const activeColumns = tableConfig.columnArray.filter(col => tableConfig.userData[col].enabled)
  const sortedData = sort.key && sort.dir ? orderBy(heroes, sort.key, sort.dir) : heroes

  return (
    <Card>
      <Table
        sort={sort}
        sortBy={setSort}
        data={sortedData}
        config={tableConfig}
        dispatch={dispatch}
        activeColumns={activeColumns}
      />
    </Card>
  )
}
