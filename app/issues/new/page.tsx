'use client';
import React, {useState} from 'react';
import {Button, Callout, TextField} from "@radix-ui/themes";
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
    const [error, setError] = useState('');

    const router = useRouter();
    return (
        <div className={"max-w-xl"}>
            { error && (
                <Callout.Root color={"red"} className={"mb-5"}>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root> )}
            <form
                className={"space-y-5"}
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (e) {
                        setError('An unexpected error has occurred.');
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input placeholder={"Enter issue title"} {...register('title')}/>
                </TextField.Root>
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div>

    );
};

export default NewIssuePage;