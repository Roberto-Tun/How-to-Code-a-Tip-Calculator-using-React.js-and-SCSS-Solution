import {Calculator} from '../components/Calculator';
import Logo  from '../images/logo.svg';

export const Home = () =>
{
    return (
        <>

            {/* Hold the main for the page */}
            <main
            className="main"
            >
                
                {/* Hold the page logo */}
                <img 
                alt="logo" 
                className="logo"
                src={Logo}  
                />

                {/* Render the calculator component */}
                <Calculator />
            </main>
        </>
    )
}