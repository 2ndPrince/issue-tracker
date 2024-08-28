import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function GET (request: NextRequest, { params }: { params: { id: string }} ) {
    const issue = prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        }
    });

    if (!issue) return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    return NextResponse.json(issue, { status: 200 });
}