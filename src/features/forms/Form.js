import React from 'react'

export const Form = (props) => {
    return (
        <form>
            <fieldset>
                <legend>Today I'm feeling...</legend>
                <label htmlFor="mood">MOOD</label>
                <span>1</span><input type="range" id="mood" name="mood" min="1" max="10" /><span>10</span>
                <label htmlFor="energy">ENERGY</label>
                <span>1</span><input type="range" id="energy" name="energy" min="1" max="10" /><span>10</span>
            </fieldset>
            <fieldset>
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">Activities I will do today:</th>
                            <th>At least one completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Morning</td>
                            <td><input type="textarea" id="morning-text" name="morning-text" rows="5" cols="33" /></td>
                            <td><input type="checkbox" id="morning-checkbox" name="morning-checkbox" /></td>
                        </tr>
                        <tr>
                            <td>Afternoon</td>
                            <td><input type="textarea" id="afternoon-text" name="afternoon-text" rows="5" cols="33" /></td>
                            <td><input type="checkbox" id="afternoon-checkbox" name="afternoon-checkbox" /></td>
                        </tr>
                        <tr>
                            <td>Evening</td>
                            <td><input type="textarea" id="evening-text" name="evening-text" rows="5" cols="33" /></td>
                            <td><input type="checkbox" id="evening-checkbox" name="evening-checkbox" /></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    )
}

