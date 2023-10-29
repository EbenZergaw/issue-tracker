'use client'
import React, {useState, useEffect} from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import axios from 'axios'

function IssuesPage() {
  const [issuesData, setIssuesData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get('/api/issues')
        setIssuesData(data.data)
      } catch (error) {
          
          setError('An unexpected error occured.')
      }
    }
    getData()
  }, [])

  return (
    <div className='grid grid-cols-2'>
      <div>
        {issuesData.map((issue) => {

          let date = new Date(issue.createdAt)

          return (
            <div className='border border-purple-300 rounded-lg p-4 mb-4 w-3/4'>
              <h2 className='text-purple-300 font-bold'>{issue.title}</h2>
              <p>{issue.description}</p>
              <div className="mt-8">
                <span className='text-purple-300'>Created at: </span>
                <span>{date.toString()}</span>
              </div>
            </div>
          )
        }
        )}
      </div>
      <div>
        <Button>
            <Link href='/issues/new'>New Issue</Link>
        </Button>
      </div>
    </div>
  )
}

export default IssuesPage