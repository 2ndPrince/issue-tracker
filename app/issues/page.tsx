import React from 'react';
import {Button} from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = () => {
    return (
        <div>
            Issues Page
            <Button>
                <Link href={"/issues/new"}>
                    Submit New Issue
                </Link>
            </Button>
        </div>
    );
};

export default IssuesPage;