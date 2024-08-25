'use client';
import React from 'react';
import {Button, TextField} from "@radix-ui/themes";
import Link from "next/link";
import {Controller, useForm} from "react-hook-form";
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";

interface NewIssueForm {
    title: string;
    description: string;
}

const NewIssuePage = ({ issue }: { issue?: NewIssueForm }) => {
    const { register, control} = useForm<NewIssueForm>();
    console.log(register('title'));
    return (
        <div className={"max-w-xl space-y-5"}>
            <TextField.Root>
                <TextField.Input placeholder={"Enter issue title"} {...register('title')}/>
            </TextField.Root>
            <Controller
                name="description"
                control={control}
                defaultValue={issue?.description}
                render={({ field }) => (
                    <SimpleMDE placeholder="Description" {...field} />
                )}
            />
            <Button>
                <Link href={"/issues"}>Submit</Link>
            </Button>
        </div>
    );
};

export default NewIssuePage;