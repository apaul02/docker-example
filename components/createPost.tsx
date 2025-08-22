"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPosts } from "@/lib/actions";
import { useState } from "react";

export function CreatePosts() {
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("");

    const handleCreatePost = async() => {
        const results = await createPosts(title, body);
        if(!results) {
            console.error("nuh uh");
        }


    }
    
    return (
        <div>
            <div className="flex justify-center flex-col h-screen">
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <Input placeholder="Titleeeeeee" onChange={(e) => setTitle(e.target.value)} className="p-4"/>
                        <Input placeholder="Body" onChange={(e) => setBody(e.target.value)}/>
                        <Button onClick={handleCreatePost}>Post</Button>
                    </div>
                </div>

            </div>
        </div>
    )
   

}
