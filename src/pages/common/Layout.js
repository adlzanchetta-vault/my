import React from "react";
import HeaderGrid from "./HeaderGrid";
import FooterGrid from "./Footer";
import { Helmet } from "react-helmet";

import "../../styles/global.css";
import "../../styles/layout.css";

export default function Layout( { title, page_id, children } ) {
    return (
        <>
            <Helmet>
                <title>{ process.env.GATSBY_PAGE_TITLE }</title>
            </Helmet>
            <HeaderGrid page_id={page_id} />
            <main>
                <div className="content">
                  {title ? (<h1>{title}</h1>) : <></>}
                  { children }
                </div>
            </main>
            <FooterGrid />
        </>
    );
}
