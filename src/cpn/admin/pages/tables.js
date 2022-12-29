import { useState, useEffect } from 'react';
import { openTab } from '../../useful';
import Navbar from '../cpn/navbar';

export default () => {

    const [ relations, setRelations ] = useState([
        // { name: "Accounts", keys: ["username"], create_on: "Dec 26 2022" },
    ]);

    useEffect(()=> {
        fetch('/api/tables').then( res => res.json() ).then((data) => {
            const { tables } = data;
            setRelations( tables );
        });
    }, [])

    return (
        <div className="full-screen flex flex-no-wrap">
            <Navbar />
            <div>
                <h1 className="block text-center text-theme">Tables</h1>
                <div className="flex flex-wrap w-fit pg-t-0-5 pg-b-0-5 mg-t-2 box-fit-nav-bar">
                { relations && relations.map( rel =>
                    <div className="block pg-t-1 pg-l-1 pg-r-1 pg-b-1 hover base-card shadow border-radius-0-5 border-pale" key={ rel.id } onClick={() => {openTab(`/table/${rel.name}`)} }>
                        <span className="block text-medium text-theme">{ rel.name }</span>
                    </div>
                ) }
                </div>
            </div>

        </div>
    )
}
