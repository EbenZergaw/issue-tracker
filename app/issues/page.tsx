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
                Open Issues
              </Button>
              <Button onClick={() => {setStatusView("closed")}} variant='outline'>
                Closed Issues
              </Button>
            </div>
            :
              <div className='space-x-5'>
                <Button onClick={() => {setStatusView("open")}} variant='outline'>
                  Open Issues
                </Button>
                <Button onClick={() => {setStatusView("closed")}}>
                  Closed Issues
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
              {/* {issuesData.map((issue) => {
                

                let date = new Date(issue.createdAt)

                return (
                  <div className='border border-purple-300 rounded-lg p-4 mb-4 w-3/4'>
                    <div className="grid grid-cols-6">
                      <div className="col-span-5">
                        <h2 className='text-purple-300 font-bold'>{issue.title}</h2>
                        <p>{issue.description}</p>
                        <div className="mt-8">
                          <span className='text-purple-300'>Created at: </span>
                          <span>{date.toString()}</span>
                        </div>
                      </div>

                      <div className='float-right'>
                        <button onClick={() => closeIssue(issue.id)}>
                          <AiFillCloseCircle  className='float-right text-2xl text-red-300'/>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
              )} */}
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