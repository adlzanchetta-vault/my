import React from "react"

export default function Footer({ t }) {
    return (
        <footer>
          <div className="content">
            {t("powered_by")}
          </div>
        </footer>
    );
}