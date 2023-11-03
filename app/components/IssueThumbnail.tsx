'use client'
import { Issue } from '@prisma/client'
import { Tooltip } from '@radix-ui/themes'
import axios from 'axios'
import React, { useState } from 'react'
import {AiFillCloseCircle, AiFillCheckCircle} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'

interface IssueThumbnailProps {
    issue: Issue;
    _getData: () => void;
  }

  const IssueThumbnail: React.FC<IssueThumbnailProps> = ({ issue, _getData }) => {

    const [isEditing, setIsEditing] = useState(false)
    
    let date = new Date(issue.createdAt)

    const closeIssue = async (id:number) => {
        try {
          let closeIssue = await axios.put('/api/issues', {id: id, action: "CLOSE"})
          _getData()
        } catch (error) {
        //   setError('An unexpected error occured')
        }
      }

    const openIssue = async(id:number) => {
      try {
        let openIssue = await axios.put('/api/issues', {id: id, action: "OPEN"})
        _getData()
      } catch (error) {
      //   setError('An unexpected error occured')
      }
    }

    const displayTooltip = (msg: string) => {

    }

    if(isEditing){
      return(
        <div className='border border-purple-300 rounded-lg p-4 mb-4 w-11/12'>
            <input className='input' type="text" value={issue.title}/>
        </div>
      )
    } else {
      return (
        <div className='border border-purple-300 rounded-lg p-4 mb-4 w-11/12'>
            <div className="grid grid-cols-10">
            <div className="col-span-9">
                <h2 className='text-purple-300 font-bold'>{issue.title}</h2>
                <p>{issue.description}</p>
                <div className="mt-8">
                <span className='text-purple-300'>Created at: </span>
                <span>{date.toDateString()}</span>
                </div>
            </div>
    
            <div className='float-right'>
              
              <div className="float-right">
                {issue.status == "CLOSED" ? 
    
                  <Tooltip content="Reopen Issue">
                    <button onClick={() => openIssue(issue.id)} onMouseEnter={() => {
                        displayTooltip("Open Issue")
                      }}>
                      <AiFillCheckCircle className='float-right text-2xl text-green-300 hover:text-red-400'/>
                    </button>
                  </Tooltip>
                : 
                <Tooltip content="Close Issue">
                  <button onClick={() => closeIssue(issue.id)}>
                    <AiFillCloseCircle  className='float-right text-2xl text-red-300 hover:text-green-400'/>
                  </button>
                </Tooltip>
                }
              </div>
    
              <div className="clear-right"></div>
    
              <Tooltip content="Edit Issue">
                <button className='float-right'>
                  <MdEdit className="text-2xl mt-12" onClick={() => {
                    setIsEditing(true)
                  }}></MdEdit>
                </button>
              </Tooltip>
    
              
                          
            </div>
            </div>
        </div>
      )
    }

}

export default IssueThumbnail