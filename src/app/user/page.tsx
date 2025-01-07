"use client"
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen w-screen text-center flex justify-center items-center">
            {session ? (
                <div>Welcome, {session.user?.name}</div>
            ) : (
                <div>Please log in</div>
            )}
        </div>
    );
}