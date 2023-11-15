import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { createIssueSchema } from "../../validationSchemas";
import { stat } from "fs";

// CREATE ISSUE
export async function POST(request: NextRequest){
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if(!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    })

    return NextResponse.json(newIssue, {status: 201})
}

// GET ISSUES
export async function GET(request: NextRequest){

    const statusView = (await request.nextUrl.searchParams.get("status_view"))
    
    
    if(statusView == "open"){
        const data = await prisma.issue.findMany({
            where: { status: Status.OPEN}
        })
        return NextResponse.json(data, {status: 201})
    } else if(statusView == "closed"){
        const data = await prisma.issue.findMany({
            where: { status: Status.CLOSED}
        })
        return NextResponse.json(data, {status: 201})
    } else if(statusView == "in_progress"){
        const data = await prisma.issue.findMany({
            where: { status: Status.IN_PROGRESS}
        })
        return NextResponse.json(data, {status: 201})
    } else if(statusView == "all"){
        const data = await prisma.issue.findMany()
        return NextResponse.json(data, {status: 201})
    }
}

// EDIT
// TOGGLE ISSUE STATUS || EDIT ISSUE TITLE / DESCRIPTION
export async function PUT(request: NextRequest){
    
    const {id, action, data} = await request.json()

    if(action == "STATUS_OPEN"){
        const issue = await prisma.issue.update({
            where: {id: id},
            data: { status: Status.OPEN }
        })
        return NextResponse.json(issue)

    } else if (action == "STATUS_CLOSE"){
        const issue = await prisma.issue.update({
            where: {id: id},
            data: { status: Status.CLOSED }
        })
        return NextResponse.json(issue)

    } else if(action == "ISSUE_EDIT"){
        console.log(data.description)
        const issue = await prisma.issue.update({
            where: {id: id},
            data: { 
                title: data.title,
                description: data.description,
                status: data.status,
                updatedAt: data.updatedAt
             }
        })
        return NextResponse.json(issue)
    }
}