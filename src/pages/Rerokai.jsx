import React from "react";
import Header from "../components/Header";
import Skills from "../components/Skills";
import { Background } from "@xyflow/react";
import Footer from "../components/Footer";
import BackBlur from "../components/BackBlur";
import About from "../components/About";

export default function Home(){
    return(
        <div classname = "rerokai-page">
            <BackBlur/>
            <Header/>
            <About/>
            <Skills/>
            <Footer/>
        </div>
    )
}