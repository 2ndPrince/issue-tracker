'use client';
import React, {useState} from 'react';
import {Button, Callout, TextField, Text} from "@radix-ui/themes";
import {Controller, useForm} from "react-hook-form";
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from "@/app/issues/validationSchema";
import { z } from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const { register, control, handleSubmit,
        formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

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
                        setSubmitting(true);
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (e) {
                        setSubmitting(false);
                        setError('An unexpected error has occurred.');
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input placeholder={"Enter issue title"} {...register('title')}/>
                </TextField.Root>
                {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
                <Button>Submit New Issue {isSubmitting && <Spinner/>} </Button>
            </form>
        </div>

    );
};

export default NewIssuePage;