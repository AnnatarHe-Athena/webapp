'use client'

import { useState } from 'react'
import { ApolloProvider, useMutation } from '@apollo/client'
import { makeClient } from '@/service/apollo.client'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import toast from 'react-hot-toast'
import { gql } from '@apollo/client'

const ADD_GIRLS = gql`
  mutation AddGirls($cells: [CellInput!]!) {
    addGirls(cells: $cells) { id img }
  }
`

const client = makeClient()

function CreateContent() {
  const [cells, setCells] = useState([
    { img: '', text: '', cate: 1, permission: 2, fromID: '', fromURL: '' },
  ])
  const [addGirls, { loading }] = useMutation(ADD_GIRLS)

  const updateCell = (index: number, field: string, value: string | number) => {
    const updated = [...cells]
    updated[index] = { ...updated[index], [field]: value }
    setCells(updated)
  }

  const addRow = () => {
    setCells([...cells, { img: '', text: '', cate: 1, permission: 2, fromID: '', fromURL: '' }])
  }

  const removeRow = (index: number) => {
    if (cells.length === 1) return
    setCells(cells.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    const validCells = cells.filter(c => c.img && c.fromURL)
    if (validCells.length === 0) {
      toast.error('At least one valid cell required')
      return
    }
    try {
      await addGirls({ variables: { cells: validCells } })
      toast.success(`${validCells.length} photos added`)
      setCells([{ img: '', text: '', cate: 1, permission: 2, fromID: '', fromURL: '' }])
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  return (
    <div className="space-y-4">
      {cells.map((cell, i) => (
        <div key={i} className="space-y-2 rounded-lg bg-gray-900 p-4 border border-gray-800">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Photo #{i + 1}</span>
            {cells.length > 1 && (
              <button onClick={() => removeRow(i)} className="text-xs text-red-400 hover:text-red-300">
                Remove
              </button>
            )}
          </div>
          <Input placeholder="Image URL" value={cell.img} onChange={(e) => updateCell(i, 'img', e.target.value)} />
          <Input placeholder="From URL" value={cell.fromURL} onChange={(e) => updateCell(i, 'fromURL', e.target.value)} />
          <Input placeholder="From ID" value={cell.fromID} onChange={(e) => updateCell(i, 'fromID', e.target.value)} />
          <Input placeholder="Text/Description" value={cell.text} onChange={(e) => updateCell(i, 'text', e.target.value)} />
        </div>
      ))}
      <div className="flex gap-2">
        <Button variant="secondary" onClick={addRow}>+ Add Row</Button>
        <Button onClick={handleSubmit} loading={loading}>Submit All</Button>
      </div>
    </div>
  )
}

export default function CreatePageClient({ userId }: { userId: string }) {
  return (
    <ApolloProvider client={client}>
      <CreateContent />
    </ApolloProvider>
  )
}
