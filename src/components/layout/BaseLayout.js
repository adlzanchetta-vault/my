import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import "../../styles/global.css";
import "../../styles/layout.css";

export function Head () {
    return (
        <title>{process.env.GATSBY_PAGE_TITLE}</title>
    )
}

export default function BaseLayout( { title, page_id, t, language, changeLanguage, children } ) {
    return (
        <>
            <Header page_id={page_id} t={t} language={language} changeLanguage={changeLanguage} />
            <main>
                <div className="content">
                  {title ? (<h1>{title}</h1>) : <></>}
                  { children }
                </div>
            </main>
            <Footer t={t} />
        </>
    );
}
