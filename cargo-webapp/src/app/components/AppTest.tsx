'use client'

import { useSession } from "next-auth/react"

export default function AppTest() {
    const { data } = useSession();
    console.log("DATA: ", data);
    return (
        <div>
            <div>So why: {data?.user.email}</div>
            <div>So why: {data?.user.accessToken}</div>
        </div>
    )
}