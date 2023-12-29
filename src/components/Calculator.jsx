import {useState} from 'react'
import DollarIcon from '../images/icon-dollar.svg'
import PersonIcon from '../images/icon-person.svg';

export const Calculator = () =>
{

    // Hold the bill
    const [bill, setBill] = useState('');

    // Hold the bill error state
    const [isBillZero, setIsBillZero] = useState(false);

    // Hold the number of people
    const [people, setPeople] = useState('');

    // Hold the people error state
    const [isPeopleZero, setIsPeopleZero] = useState(false);

    // Hold the active tip index
    const [tipIndex, setTipIndex] = useState(-1);

    // Hold the custom tip amount
    const [customTip, setCustomTip] = useState('');

    // Hold the tip amount per person
    const [tipPerPerson, setTipPerPerson] = useState('0.00');

    // Hold the total billper person
    const [totalPerPerson, setTotalPerPerson] = useState('0.00');

    /*
    Handle the input of the bill
    @param value the value of the text input
    @return void
    */
    const handleBillInput = (value) =>
    {
        
        // Reset value to eliminate whitespace
        value = value.trim();

        // Check if value is a number
        if (!isNaN(value)) 
        {

            // Check if there is a decimal
            if(value.includes('.') && value.length - 1 - value.indexOf('.') === 3)
            {

                // Convert value to a number and format it with two decimal places
                const formattedValue = parseFloat(value).toFixed(2);

                // Convert the formatted value to a string
                const stringValue = formattedValue.toString();

                // Set bill
                setBill(stringValue);
            }

            // Else no decimal
            else
            {

                // Set bill
                setBill(value)
            }

            // Check if the value is zero
            if(parseFloat(value) === 0) setIsBillZero(true);

            // Else remove error
            else setIsBillZero(false);
        } 

        // Else return 
        else
        {
            return;
        }
    }

    /*
    Handle the input of the people
    @param value the value of the text input
    @return void
    */
    const handlePeopleInput = (value) =>
    {
        
        // Reset value to eliminate whitespace
        value = value.trim();

        // Check if value is a number
        if (!isNaN(value)) 
        {

            // Check for empty input
            if(value.length === 0) setPeople('');

            // Else valid input
            else 
            {
                
                // Parse to int
                const intValue = parseInt(value);      
                
                // Convert to string
                const formattedString = intValue.toString();

                // Set the people
                setPeople(formattedString);

                // Check if the value is zero
                if(parseInt(formattedString) === 0) setIsPeopleZero(true);

                // Else remove error
                else setIsPeopleZero(false);
            }
        }

        // Else return
        else
        {

            // Return
            return;
        }
    }

    /*
    Handle the calculation of the tip
    @param index the index corresponding to the tip button pressed
    decimalTip the value of the tip button pressed
    @return void
    */
    const handleTipButton = (index, decimalTip) =>
    {

        // Check if we can calculate bill
        if(!canCalculateBill()) return;

        // Set the custom tip to empty
        setCustomTip('');

        // Hold the buttons
        const tipButtons = document.getElementsByClassName('tip-button');

        // Loop through the tip button
        for(let i = 0; i < tipButtons.length; i++)
        {

            // Check the current index selected
            if(i == tipIndex && tipIndex != index)
            {
                
                // Hold the element
                const tipButtonElement = tipButtons[i];

                // Set the style
                tipButtonElement.style.backgroundColor = 'hsl(183, 100%, 15%)';
                tipButtonElement.style.color = 'hsl(0, 0%, 100%)';
            }

            // Else check for the new index selected
            else if(index == i)
            {

                // Hold the element
                const tipButtonElement = tipButtons[i];

                // Set the style
                tipButtonElement.style.backgroundColor = 'hsl(172, 67%, 45%)';
                tipButtonElement.style.color = 'hsl(183, 100%, 15%)';
            }
        }

        // Set the current index
        setTipIndex(index);

        // Calculate bill
        calculateBill(decimalTip);        
    }

    /*
    Handle the custom tip amount 
    @param value the value of the text input
    @return void
    */
    const handleCustomInput = (value) =>
    {

        // Check if we can calculate bill
        if(!canCalculateBill()) return;

        // Reset value to eliminate whitespace
        value = value.trim();

        // Hold the buttons
        const tipButtons = document.getElementsByClassName('tip-button');

        // Loop through the tip button
        for(let i = 0; i < tipButtons.length; i++)
        {

            // Check the current index selected
            if(i == tipIndex)
            {
                
                // Hold the element
                const tipButtonElement = tipButtons[i];

                // Set the style
                tipButtonElement.style.backgroundColor = 'hsl(183, 100%, 15%)';
                tipButtonElement.style.color = 'hsl(0, 0%, 100%)';
            }
        }

        // Reset tip index
        setTipIndex(-1);

        // Check if value is a number
        if (!isNaN(value)) 
        {

            // Check for empty input
            if(value.length === 0) setCustomTip('');

            // Else check if the length is greater than 3
            else if(value.length >= 3) setCustomTip(customTip);

            // Else valid input
            else 
            {
                
                // Parse to int
                const intValue = parseInt(value);      
                
                // Convert to string
                const formattedString = intValue.toString();

                // Set the custom tip
                setCustomTip(formattedString);

                // Calculate bill
                calculateBill(parseFloat(intValue/100));
            }
        }

        // Else return
        else
        {

            // Return
            return;
        }
    }

    /*
    Handle the math calculation of the bill
    @param decimalTip the decimal of the tip percentage
    @return void
    */
    const calculateBill = (decimalTip) =>
    {
        
        // Edge case
        if(people == 0 || decimalTip == 0)
        {
            setTipPerPerson('0.00');
            setTotalPerPerson('0.00');
        } 

        // Hold the tip per person
        setTipPerPerson((parseFloat(bill) * decimalTip).toFixed(2)); 

        // Hold the total per person
        setTotalPerPerson(((parseFloat(bill) * decimalTip) + (parseFloat(bill) / parseInt(people))).toFixed(2));
    }

    /*
    Handle the reset of the text inputs
    @param none
    @return void
    */
    const handleResetButton = () =>
    {

        // Reset text to 0
        setTipPerPerson('0.00');
        setTotalPerPerson('0.00');

        // Reset the inputs
        setBill('');
        setPeople('');

        // Reset the custom input
        setCustomTip('');

        // Reset the button tip
        setTipIndex(-1);

        // Hold the buttons
        const tipButtons = document.getElementsByClassName('tip-button');
    
        // Add regular style to all tip buttons
        for(let i = 0; i < tipButtons.length; i++)
        {

            // Hold the element
            const tipButtonElement = tipButtons[i];

            // Set the style
            tipButtonElement.style.backgroundColor = 'hsl(183, 100%, 15%)';
            tipButtonElement.style.color = 'hsl(0, 0%, 100%)';
        }
    }

    /*
    Check if we can calculate the bill
    @param none
    @return bool true if we can calculate the bill
    */
    const canCalculateBill = () =>
    {

        return bill.length !== 0  && parseFloat(bill) > 0.0 && parseInt(people) > 0;
    }

    return (
        <>

            {/* Hold the calculator container */}
            <div 
            className="calculator-container"
            >
                
                {/* Hold the left container */}
                <div 
                className="left-container"
                >
                    
                    {/* Hold the form control element */}
                    <div 
                    className="form-control"
                    >

                        {/* Hold the error control for the input */}
                        <div 
                        className="error-control"
                        >
                            
                            {/* Hold the form label */}
                            <p 
                            className="label"
                            >
                                Bill
                            </p>
                            
                            {/* Render the error label if the bill is zero */}
                            {isBillZero &&
                                
                                // Hold the error label 
                                <p 
                                className="error-label"
                                >
                                    Bill can't be zero
                                </p>
                            }
                        </div>

                        {/* Hold the input container */}
                        <div 
                        className="input-container"
                        >

                            {/* Hold the logo for the input */}
                            <img 
                            alt="input-logo-1"
                            className="input-icon" 
                            src={DollarIcon} 
                            />

                            {/* Hold the input */}
                            <input 
                            className="input" 
                            onChange={(e) => handleBillInput(e.target.value)}
                            type="text"
                            value={bill}
                            />
                        </div>
                    </div>

                    {/* Hold the form control element */}
                    <div 
                    className="form-control"
                    >

                        {/* Hold the form label */}
                        <p 
                        className="label"
                        >
                            Select Tip %
                        </p>

                        {/* Hold the grid container */}
                        <div 
                        className="grid-container"
                        >

                            {/* Hold the button for the tip % */}
                            <button
                            className="tip-button"
                            onClick={() => handleTipButton(0, .05)}
                            >
                                5%
                            </button>

                            {/* Hold the button for the tip % */}
                            <button
                            className="tip-button"
                            onClick={() => handleTipButton(1, .1)}
                            >
                                10%
                            </button>

                            {/* Hold the button for the tip % */}
                            <button
                            className="tip-button"
                            onClick={() => handleTipButton(2, .15)}
                            >
                                15%
                            </button>

                            {/* Hold the button for the tip % */}
                            <button
                            className="tip-button"
                            onClick={() => handleTipButton(3, .25)}
                            >
                                25%
                            </button>

                            {/* Hold the button for the tip % */}
                            <button
                            className="tip-button"
                            onClick={() => handleTipButton(4, .5)}
                            >
                                50%
                            </button>

                            {/* Hold the custom tip % */}
                            <div 
                            className="custom-input"
                            >

                                {/* Hold the input for the custom tip */}
                                <input 
                                className="input"
                                onChange={(e) => handleCustomInput(e.target.value)}
                                placeholder="Custom"
                                type="text"
                                value={customTip} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hold the form control for the element */}
                    <div 
                    className="form-control"
                    >

                        {/* Hold the error control for the input */}
                        <div 
                        className="error-control"
                        >
                            
                            {/* Hold the form label */}
                            <p 
                            className="label"
                            >
                                Number of People
                            </p>
                            
                            {/* Render the error label if the bill is zero */}
                            {isPeopleZero &&
                                
                                // Hold the error label 
                                <p 
                                className="error-label"
                                >
                                    People can't be zero
                                </p>
                            }
                        </div>

                        {/* Hold the input container */}
                        <div 
                        className="input-container"
                        >

                            {/* Hold the logo for the input */}
                            <img 
                            alt="input-logo-1"
                            className="input-icon" 
                            src={PersonIcon} 
                            />

                            {/* Hold the input */}
                            <input 
                            className="input"
                            onChange={(e) => handlePeopleInput(e.target.value)} 
                            type="text"
                            value={people}
                            />
                        </div>
                    </div>
                </div>
                                
                {/* Hold the right container */}
                <div 
                className="right-container">
                    
                    
                    {/* Hold the result screen */}
                    <div 
                    className="result-screen"
                    >

                        {/* Hold the screen row */}
                        <div 
                        className="screen-row"
                        >

                            {/* Hold the text container */}
                            <div 
                            className="text-container"
                            >

                                {/* Hold the heading */}
                                <p 
                                className="heading"
                                >
                                    Tip Amount
                                </p>

                                {/* Hold the subheading */}
                                <p 
                                className="subheading"
                                >
                                    / person
                                </p>
                            </div>

                            {/* Hold the result */}
                            <p 
                            className="result"
                            >
                                ${tipPerPerson}
                            </p>
                        </div>

                        {/* Hold the screen row */}
                        <div 
                        className="screen-row"
                        >

                            {/* Hold the text container */}
                            <div 
                            className="text-container"
                            >

                                {/* Hold the heading */}
                                <p 
                                className="heading"
                                >
                                    Total
                                </p>

                                {/* Hold the subheading */}
                                <p 
                                className="subheading"
                                >
                                    / person
                                </p>
                            </div>

                            {/* Hold the result */}
                            <p 
                            className="result"
                            >
                                ${totalPerPerson}
                            </p>
                        </div>

                        {/* Hold the reset button */}
                        <button 
                        className="reset"
                        onClick={handleResetButton}
                        >
                            RESET
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}