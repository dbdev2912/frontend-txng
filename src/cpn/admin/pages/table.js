import { useParams } from 'react-router-dom';
import Navbar from '../cpn/navbar';
import { compareBy } from '../../useful';
import React, { useState, useEffect } from 'react';

export default () => {

    const { rel } = useParams();
    const [ fields, setFields ] = useState([]);
    const [ keys, setKeys ] = useState([]);
    const [ foreign_keys, setForeignKeys ] = useState([]);
    const [ data, setData ] = useState([]);

    useEffect(()=> {
        fetch(`/api/${rel}/fields`).then( res => res.json() ).then( (data) => {
            const { fields, foreign_keys, keys } = data;
            setFields( fields );
            setKeys( keys );
            setForeignKeys(foreign_keys);

            fetch(`/api/${rel}/data`).then(res => res.json()).then( (resp) => {
                const { data } = resp

                let sort_indexes = fields.filter( field => field.is_sort_index ).map( field => field.name );

                data.sort(compareBy(...sort_indexes))

                setData( data );
            });

        });
    }, []);

    const dataRender = ( row, field ) => {
        if( field.type.value === 'bool' ){
            if( row[field.name] ){
                return "true"
            }
            return "false"
        }else{
            if( row[field.name] ){
                return row[field.name]
            }
            return "unknown"
        }
    }

    const reSorting = (field) =>{
        data.sort(( row1, row2 ) =>  row1[field] > row2[field] ? 1 : -1 );
        console.log(data)
        setData(data);
    }

    return (
        <div className="full-screen flex flex-no-wrap">
            <Navbar/>
            <div className="w-80 mg-auto mg-t-2">
                <h1 className="text-theme block text-center">{ rel.toUpperCase() }</h1>

                <div className="mg-t-2 w-fit table-list">
                    <table className="w-fit no-border">
                        <thead>
                            <tr>
                            { fields.length > 0 && fields.map( field =>
                                field.is_visible ?
                                <th key={field.id} onClick={ () => { reSorting( field.name ) } } className="text-white theme-hightlight text-left pg-t-0-5 pg-l-0-5 pg-b-0-5 no-hover" style={ {display: "table-cell"} }>{ field.name }</th> : null
                            ) }
                            </tr>
                        </thead>
                        <tbody>
                        { data.length > 0 ?
                            data.map( (row) =>                            
                                <tr className="hover" key={ row["_id"] }>
                                    { fields.length> 0 && fields.map( field =>
                                        <React.StrictMode>
                                            { field.is_visible ?
                                                <td key={ field.id } className="pg-t-0-5 pg-l-0-5 pg-b-0-5 border-bottom-pale">{ dataRender(row, field) }</td> : null
                                             }
                                        </React.StrictMode>

                                    )}
                                </tr>
                            )
                        : null}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}
