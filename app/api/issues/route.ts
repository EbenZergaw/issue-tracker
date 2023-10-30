import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { createIssueSchema } from "../../validationSchemas";

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

// GET OPEN ISSUES
export async function GET(request: NextRequest){
    const data = await prisma.issue.findMany({
        where: { status: Status.OPEN}
    })
    return NextResponse.json(data, {status: 201})
}

// CLOSE ISSUE 
export async function PUT(request: NextRequest){
    const {id, status} = await request.json()
    const issue = await prisma.issue.update({
        where: {id: id},
        data: { status: Status.CLOSED }
    })

    return NextResponse.json(issue)
}