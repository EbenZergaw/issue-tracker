'use client'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

function NewIssuePage() {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder='Title'></TextField.Input>
            <TextArea placeholder='Description'></TextArea>
            <Button>Submit New Issue</Button>
        </TextField.Root>
    </div>
  )
}

export default NewIssuePage