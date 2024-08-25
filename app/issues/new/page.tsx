'use client';
import React from 'react';
import {Button, TextField} from "@radix-ui/themes";
import {Controller, useForm} from "react-hook-form";
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import axios from "axios";
import {useRouter} from "next/navigation";

interface NewIssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const { register, control, handleSubmit}
        = useForm<NewIssueForm>();

    const router = useRouter();
    return (
        <form
            className={"max-w-xl space-y-5"}
            onSubmit={handleSubmit(async (data)=> {
                await axios.post('/api/issues', data);
                router.push('/issues');
            })}
        >
            <TextField.Root>
                <TextField.Input placeholder={"Enter issue title"} {...register('title')}/>
            </TextField.Root>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMDE placeholder="Description" {...field} />
                )}
            />
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;