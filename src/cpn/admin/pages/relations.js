import { useState, useEffect } from 'react';
import { dateFormat, dateStringFormat, auto_id } from '../../useful';
import Navbar from '../cpn/navbar';

import Field from './field';

export default () => {
    let form = false;
    const [ relations, setRelations ] = useState([
        // { name: "Accounts", keys: ["username"], create_on: "Dec 26 2022" },
    ]);

    const defaultField = {
        name: "New field", is_primary: false, is_sort_index: false, is_search_index: false, is_visible: false,
        data_type: "Not selected yet",
    }

    const [ current, setCurrent ] = useState({});

    const [ editButton, setEditButton ] = useState(false)

    useEffect(()=> {
        fetch('/api/tables').then( res => res.json() ).then((data) => {
            const { tables } = data;
            setRelations( tables );
            setCurrent( tables.length > 0 ? tables[0] : {} );
        });
    }, [])


    const setRelation = (index) => {
        /* Database async query */
        setCurrent( relations[index] )

    }

    const submitNewRelation = () => {
        const newRelationName = "New relation";

        if( newRelationName ){
            fetch('/api/models/new/table', {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ name: newRelationName })
            }).then(res => res.json()).then( data => {
                const { id } = data;
                const date = new Date();
                setRelations([...relations,
                    { id, name: "New Relation", keys: [], fields: [], foreign_keys: [], create_on: date.toString() }
                ]);
            })
        }
    }

    const editOrStatic = () => {
        setEditButton( !editButton )
    }

    const addField = () => {
        setCurrent( {...current, fields: [...current.fields, {...defaultField, id: auto_id() }]})
        console.log(current)
    }


    return(
        <div className="full-screen flex flex-no-wrap">
            <Navbar/>
            <div className="flex flex-no-wrap w-fit pg-t-0-5 pg-b-0-5 mg-t-2 box-fit-nav-bar">
                <div className="w-50">
                    <div className="flex w-100 flex-end">
                        <button className="button-theme block pg-t-0-5 pg-l-0.5 pg-r-0-5 pg-b-0-5 mg-r-1"  onClick={ submitNewRelation }>Add new</button>
                    </div>
                    <div className="table-list">
                        <table className="w-fit no-border">
                            <thead>
                                <tr>
                                    <th className="text-theme text-left pg-t-0-5 pg-l-0-5 pg-b-0-5" style={ {display: "table-cell"} }>Name</th>
                                    <th className="text-theme text-left pg-t-0-5 pg-l-0-5 pg-b-0-5" style={ {display: "table-cell"} }>Keys</th>
                                    <th className="text-theme text-left pg-t-0-5 pg-l-0-5 pg-b-0-5" style={ {display: "table-cell"} }>Create on</th>
                                </tr>
                            </thead>
                            <tbody id="relations">
                                {relations.map( (r, index) =>
                                    <tr className={r.id === current.id ? "hover theme-hightlight": "hover"} key={index} onClick={ ()=> { setRelation(index) } }>
                                        <td className="pg-t-0-5 pg-l-0-5 pg-b-0-5 border-bottom-pale">{ r.name }</td>
                                        <td className="pg-t-0-5 pg-l-0-5 pg-b-0-5 border-bottom-pale">{ r.keys.join(', ') }</td>
                                        <td className="pg-t-0-5 pg-l-0-5 pg-b-0-5 border-bottom-pale">{ dateStringFormat(r.create_on) }</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>

                { current  ?
                <div className="w-50 border-left-pale" >

                    <div className="block w-100 pg-t-1 pg-t-0-5 pg-l-0.5 pg-r-0-5 pg-b-0-5 mg-r-1">
                        <div className="flex w-fit flex-no-wrap relative">
                            { editButton ?
                                <input className="block w-fit border-bottom-pale text-medium text-center" value={ current.name } onChange={ (e) => {setCurrent( {...current, name: e.target.value} ) }}/>
                                :
                                <span className="block w-fit border-bottom-pale text-medium text-center">{ current.name }</span>
                            }
                            <img className="icon absolute r-0 t-0 edit-icon" src="/icon/edit.png" onClick={ editOrStatic }/>
                        </div>
                    </div>

                    { current.fields && current.fields.map( f =>
                        <Field field = {f}/>
                    )}

                    <div className="add">
                        <img src="/icon/add.png" className="icon block ml-auto mg-r-2" onClick={ addField }/>
                    </div>
                </div>
                    : null
                }

            </div>
        </div>
    )
}
