import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { createIssueSchema } from "../../validationSchemas";

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
    } else {
        const data = await prisma.issue.findMany({
            where: { status: Status.CLOSED}
        })
        return NextResponse.json(data, {status: 201})
    }
}

// TOGGLE ISSUE STATUS
export async function PUT(request: NextRequest){
    const {id, action} = await request.json()
    if(action == "OPEN"){
        const issue = await prisma.issue.update({
            where: {id: id},
            data: { status: Status.OPEN }
        })
        return NextResponse.json(issue)

    } else if (action == "CLOSE"){
        const issue = await prisma.issue.update({
            where: {id: id},
            data: { status: Status.CLOSED }
        })
        return NextResponse.json(issue)
    }
    

}