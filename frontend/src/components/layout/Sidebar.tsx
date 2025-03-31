"use client"
import { useEffect, useId, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ButtonOption from "../ButtonOption"

export default function Sidebar(){
    const userId = "current-user-id" // Replace this with actual user ID from your auth system
    
    return(
        <div>
            <div className="flex flex-col justify-between py-5 md:w-20 md:h-screen items-center bg-zinc-50 w-screen h-20">
                <img width={40} className="hidden md:block" src="/loom.png" alt="logo" />
                <div className="flex md:flex-col  md:gap-16 gap-5  flex-row ">
                    <Link href={"/"} className="hover:bg-slate-200 p-3 rounded-lg">
                        <img width={22} src="/assets/home.svg" alt="home" />
                    </Link>
                    <Link href={"/search"} className="hover:bg-slate-200 p-3 rounded-lg">
                        <img width={22} src="/assets/search.svg" alt="search" />
                    </Link>
                    <Link href={"/activity"} className="hover:bg-slate-200 p-3 rounded-lg relative cursor-pointer">
                        <img width={22} src="/assets/heart.svg" alt="heart" />
                    </Link>
                    
                    
                        <Link href={`/profile/${userId}`} className="hover:bg-slate-200 p-3 rounded-lg">
                            <img width={20} src="/assets/profile.svg" alt="profile" />
                        </Link>
                    
                </div>
                <div className="pb-10">
                    <ButtonOption/>
                </div>
            </div>
            
        </div>
    )
}