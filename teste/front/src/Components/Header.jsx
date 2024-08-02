import "../Styles/Header.css"

function Header({ title }){
    
    
    return (
        <header>
            <h1>{ title }</h1>
        </header>
    )
}

Header.propTypes = 'Título';

export default Header;