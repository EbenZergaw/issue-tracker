'use client'
import React, {useState, useEffect} from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import axios from 'axios'
import {AiFillCloseCircle} from 'react-icons/ai'
import IssueThumbnail from '../components/IssueThumbnail'

function IssuesPage() {
  const [statusView, setStatusView] = useState("open")
  const [issuesData, setIssuesData] = useState([])
  const [error, setError] = useState('')

  const getData = async (statusView : String) => {
    try {
      const data = await axios.get('/api/issues', {
        params: {
          status_view: statusView
        }
      })
      setIssuesData(data.data)
    } catch (error) {
        
        setError('An unexpected error occured.')
    }
  }

  useEffect(() => {
    getData(statusView)
  }, [statusView])

  return (
    <div className='grid grid-cols-2'>
      <div>
        <h2 className="text-2xl text-purple-500 mb-5">Issues</h2>

        <div className="flex mb-10">
          {statusView == "open" ? 
            <div className='space-x-5'>
              <Button onClick={() => {setStatusView("open")}}>
                <span className="text-red-300">Open Issues</span>
              </Button>
              <Button onClick={() => {setStatusView("closed")}} variant='outline'>
                Closed Issues
              </Button>
              <Button onClick={() => {setStatusView("in_progress")}} variant='outline'>
                In Progress
              </Button>
            </div>
            : statusView == 'closed' ?
              <div className='space-x-5'>
                <Button onClick={() => {setStatusView("open")}} variant='outline'>
                  Open Issues
                </Button>
                <Button onClick={() => {setStatusView("closed")}}>
                  <span className="text-green-300">Closed Issues</span>
                </Button>
                <Button onClick={() => {setStatusView("in_progress")}} variant='outline'>
                  In Progress
                </Button>
              </div>
            : <div className='space-x-5'>
                <Button onClick={() => {setStatusView("open")}} variant='outline'>
                  Open Issues
                </Button>
                <Button onClick={() => {setStatusView("closed")}} variant='outline'>
                  Closed Issues
                </Button>
                <Button onClick={() => {setStatusView("in_progress")}} >
                  <span className="text-blue-400">In Progress</span>
                </Button>
              </div>
          }
          
        </div>

        {issuesData.map((issue) => {
          return(
            <div>
              <IssueThumbnail key={issue.id} issue={issue} _getData={() => {
              getData(statusView)
          }} />
            </div>
          )
        })}
      
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