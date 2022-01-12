import React from 'react'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer_inner">
                <div className="footer_inner_created">Created by Thibaud Brault <br /> Powered by PokéApi</div>
                <div className="footer_inner_title">PokéInfo</div>
                <div className="footer_inner_btn"><a href="#header"><i className="fas fa-arrow-up"></i></a>
                </div>
            </div>
        </footer>
    )
}
