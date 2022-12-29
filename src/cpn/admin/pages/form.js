import { useParams } from 'react-router-dom';
import Navbar from '../cpn/navbar';

import { useState, useEffect } from 'react';

import TextInput from '../cpn/form-widgets/text';
import DateInput from '../cpn/form-widgets/date';
import DecimalInput from '../cpn/form-widgets/decimal';
import NumberInput from '../cpn/form-widgets/number';
import BoolInput from '../cpn/form-widgets/bool';

export default () => {
    const { rel } = useParams();
    const [ fields, setFields ] = useState([]);
    const [ keys, setKeys ] = useState([]);
    const [ foreign_keys, setForeignKeys ] = useState([]);
    const [ data, setData ] = useState({});
    useEffect(()=> {
        fetch(`/api/${rel}/fields`).then( res => res.json() ).then( (data) => {
            const { fields, foreign_keys, keys } = data;
            setFields( fields );
            setKeys( keys );
            setForeignKeys(foreign_keys);
        })
    }, []);

    const submit = () => {
        fetch(`/api/${rel}/add/data`, {
            method: "post",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify({ data })
        }).then(res => res.json()).then(data => {
            const { success } = data;
            if( success ){
                alert( "Insert data successfully" );
            }else{
                alert( "Opps! Something wrong just happened!!" );
            }
        })
    }

    return (
        <div className="full-screen flex flex-no-wrap">
            <Navbar/>
            <div className="w-80 mg-auto mg-t-2">
                <h1 className="text-theme block text-center">{ rel.toUpperCase() }</h1>

                { fields.map( field =>
                    <div key={ field.id }>
                        { field.type.value === 'int' ?
                            <NumberInput setter={setData} field={ field } keys={keys} foreign_keys={ foreign_keys } data={ data }/> : null }
                        { field.type.value === 'text' ?
                            <TextInput setter={setData} field={ field } keys={keys} foreign_keys={ foreign_keys } data={ data }/> : null }
                        { field.type.value === 'bool' ?
                            <BoolInput setter={setData} field={ field } keys={keys} foreign_keys={ foreign_keys } data={ data }/> : null }
                        { field.type.value === 'date' ?
                            <DateInput setter={setData} field={ field } keys={keys} foreign_keys={ foreign_keys } data={ data }/> : null }
                        { field.type.value === 'decimal' ?
                            <DecimalInput setter={setData} field={ field } keys={keys} foreign_keys={ foreign_keys } data={ data }/> : null }
                    </div>

                )}

                <div className="w-80 mg-auto mg-t-2 form-small">
                    <button className="w-fit pg-t-0-5 pg-b-0-5 button-theme" onClick={ submit }>Submit</button>
                </div>

            </div>
        </div>
    )
}
