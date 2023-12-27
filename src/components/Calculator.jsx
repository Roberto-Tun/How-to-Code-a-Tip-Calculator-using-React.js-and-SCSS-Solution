import {useState} from 'react'
import DollarIcon from '../images/icon-dollar.svg'
import PersonIcon from '../images/icon-person.svg';

export const Calculator = () =>
{

    // Hold the bill
    const [bill, setBill] = useState('');

    // Hold the number of people
    const [people, setPeople] = useState('');

    // Hold the tip %
    const  [tip, setTip] = useState(0);

    // Hold the active tip index
    const [tipIndex, setTipIndex] = useState(-1);

    // Hold the custom tip amount
    const [customTip, setCustomTip] = useState('');

    // Hold the tip amount per person
    const [tipPerPerson, setTipPerPerson] = useState('0.00');

    // Hold the total billper person
    const [totalPerPerson, setTotalPerPerson] = useState('0.00');

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
        } 

        // Else return 
        else
        {
            return;
        }
    }

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
            }
        }

        // Else return
        else
        {

            // Return
            return;
        }
    }

    const handleTipButton = (index, decimalTip) =>
    {

        // Set the custom tip to empty
        setCustomTip('');

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

        // Set the tip decimal
        setTip(decimalTip);

        // Calculate bill
        calculateBill(decimalTip);
    }

    const handleCustomInput = (value) =>
    {

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

                // Set the tip
                setTip(parseFloat(intValue/100));

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

        // Holt the total per person
        setTotalPerPerson(((parseFloat(bill) * decimalTip) + (parseFloat(bill) / parseInt(people))).toFixed(2));
    }

    const handleResetButton = () =>
    {

        setTipPerPerson('0.00');
        setTotalPerPerson('0.00');
    }

    return (
        <>

            {/* Hold the calculator container */}
            <div 
            className="calculator-container"
            >
                
                {/* Hold the form control element */}
                <div 
                className="form-control"
                >

                    {/* Hold the form label */}
                    <p 
                    className="label"
                    >
                        Bill
                    </p>

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

                    {/* Hold the form label */}
                    <p 
                    className="label"
                    >
                        Number of People
                    </p>

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
        </>
    )
}