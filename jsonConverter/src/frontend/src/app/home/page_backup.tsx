"use client";

import Image from "next/image";
import { useState } from 'react';
import Logo from "../component/logo";
import Explanation from "../component/explanation";
import Form from "../component/form";

export default function page() {
    return (
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Logo />
                <Explanation />
                <Form />
            </main>
    );
}
