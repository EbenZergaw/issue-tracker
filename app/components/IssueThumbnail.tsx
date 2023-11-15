'use client'
import { Issue } from '@prisma/client'
import { Select, TextFieldInput, Tooltip } from '@radix-ui/themes'
import axios from 'axios'
import React, { useState } from 'react'
import {GoIssueOpened, GoIssueClosed} from 'react-icons/go'
import {MdEdit} from 'react-icons/md'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import {useForm, Controller} from 'react-hook-form'
import ErrorMessage from '@/app/components/ErrorMessage';
import SimpleMDE, {SimpleMdeReact} from "react-simplemde-editor";
import { createIssueSchema } from '@/app/validationSchemas';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import "easymde/dist/easymde.min.css";

interface IssueThumbnailProps {
    issue: Issue;
    _getData: () => void;
  }

  import "easymde/dist/easymde.min.css";
  const IssueThumbnail: React.FC<IssueThumbnailProps> = ({ issue, _getData }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(issue.title)
    const [editDesc, setEditDesc] = useState(issue.description)
    const [editStatus, setEditStatus] = useState(issue.status)
    
    let date = new Date(issue.createdAt)

    const closeIssue = async (id:number) => {
        try {
          let closeIssue = await axios.put('/api/issues', {id: id, action: "STATUS_CLOSE", data:{}})
          _getData()
        } catch (error) {
        //   setError('An unexpected error occured')
        }
      }

    const openIssue = async(id:number) => {
      try {
        let openIssue = await axios.put('/api/issues', {id: id, action: "STATUS_OPEN", data:{}})
        _getData()
      } catch (error) {
      //   setError('An unexpected error occured')
      }
    }

    const editIssue = async (id: number) => {
      console.log(editDesc);
      try {
        const data = {
          title: editTitle,
          description: editDesc,
          status: editStatus,
          updatedAt: new Date()
        }
        
        let editIssue = await axios.put('/api/issues', {id: id, action:"ISSUE_EDIT", data})
        _getData()
      } catch (error) {
        console.log(error);
      }
      
    }


    type IssueForm = z.infer<typeof createIssueSchema>

    const {register, control, handleSubmit, formState: { errors }}  = useForm<IssueForm>({
      resolver: zodResolver(createIssueSchema)
     })

    if(isEditing){
      
      return(
        <div className='border border-purple-600 rounded-lg p-4 mb-4 w-11/12'>
           <TextField.Root>
                <TextFieldInput type="text" value={editTitle} placeholder={issue.title} onChange={(e) => {
                  setEditTitle(e.target.value)
                }}/>
            </TextField.Root>

            <SimpleMdeReact className='mt-4'
              value={issue.description}
              onChange={(e) => {
                setEditDesc(e)
              }}
            ></SimpleMdeReact>

            <div className="flex items-center">
              <Button onClick={(e) => {
                    e.preventDefault()
                    editIssue(issue.id)
                    setIsEditing(false)
                  }}>
                  Save
              </Button>
              
              <div className="ml-4">
                <Select.Root defaultValue={editStatus} onValueChange={(val) => {
                  setEditStatus(val)
                }}>
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="OPEN">OPEN</Select.Item>
                      <Select.Item value="IN_PROGRESS">IN PROGRESS</Select.Item>
                      <Select.Item value="CLOSED">CLOSED</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>

              <div className="ml-4">
                <Button variant='ghost' onClick={(e) => {
                  setIsEditing(false)
                }}>
                  Cancel
                </Button>
              </div>
            </div>
        </div>
      )
    } else {
      return (
        <div className='border border-purple-600 rounded-lg p-4 mb-4 w-11/12'>
            <div className="grid grid-cols-10">
            <div className="col-span-9">
                <h2 className='text-purple-600 font-bold'>{issue.title}</h2>
                <p>{issue.description}</p>
                <div className="mt-8">
                <span className='text-purple-600'>Created at: </span>
                <span>{date.toDateString()}</span>
                </div>
            </div>
    
            <div className='float-right'>
              
              <div className="float-right">
                {issue.status == "CLOSED" ? 
    
                  <Tooltip content="Reopen Issue">
                    <button onClick={() => openIssue(issue.id)}>
                      <GoIssueClosed className='float-right text-2xl text-green-600 hover:text-red-600'/>
                    </button>
                  </Tooltip>
                : 
                <Tooltip content="Close Issue">
                  <button onClick={() => closeIssue(issue.id)}>
                    <GoIssueOpened  className='float-right text-2xl text-red-600 hover:text-green-600'/>
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