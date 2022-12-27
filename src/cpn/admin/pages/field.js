import React, { useState } from 'react';
import $ from 'jquery';

export default (props) => {
    const [ field, setField ] = useState(props.field);

    const [ drop, setDrop ] = useState(false);
    const [ innerDrop, setInnerDrop ] = useState(false);
    const [ height, setHeight ] = useState(0);
    const [ innerHeight, setInnerHeight ] = useState(0);

    const dataTypes = [
        { id: "1", label: "Int", value: "int" , exp: "10"},
        { id: "2", label: "Text", value: "text", exp: "Example"},
        { id: "3", label: "Date", value: "date", exp: "1-1-1970" },
        { id: "4", label: "Decimal", value: "decimal", exp: "10.05" },
        { id: "5", label: "Bool", value: "bool", exp: "True/False" },
    ]

    const dropdownTrigger = (e) => {

        let height = $(e.target).closest(".field").find(".outer-drop-container").height();
        height = height > 450 ? height: 450;
        setHeight( drop ? 0: height );
        setDrop( !drop )
    }

    const innerDropdownTrigger = () => {
        setInnerHeight( innerDrop? 0: 200 )
        setInnerDrop( !innerDrop )
    }

    return(
        <div className="pg-t-1 pg-l-0-5 pg-r-0-5 w-80 mg-auto field">
            <div className="relative">
            <span className="block w-fit border-bottom-pale text-left transparent text-little-bigger">{ field.name }</span>
                { drop ?
                    <React.StrictMode>
                        <img className="icon absolute drop-icon" src = "/icon/drop.png" onClick={ dropdownTrigger }/>
                    </React.StrictMode>
                    :
                    <React.StrictMode>
                        <img className="icon absolute drop-icon" src = "/icon/undrop.png" onClick={ dropdownTrigger }/>
                    </React.StrictMode>
                 }
            </div>
            { /* <div className="no-over-flow" style={{ height: `${height}px` }}></div> */}
            <div className="no-over-flow" style={{ height: `${height}px` }}>
                <div className="pg-l-5 drop-container outer-drop-container">
                    <div className="flex flex-no-wrap mg-t-1">
                        <div className="w-50 flex flex-middle">
                            <span className="text-left">Field Name</span>
                        </div>
                        <div className="w-50">
                            <input className="input-outline border-bottom-pale pg-t-0-5 pg-l-0-5 pg-b-0-5  block w-fit" value={ field.name } onChange={ (e) =>{ setField( {...field, name: e.target.value} )} } />
                        </div>
                    </div>

                    <div className="flex flex-no-wrap  mg-t-1">
                        <div className="w-50 flex flex-middle">
                            <span className="text-left">Data type</span>
                        </div>
                        <div className="w-50">
                            <div className="relative">
                                <span className="block w-fit border-bottom-pale text-left text-little-bigger">{ "Int" }</span>
                                { innerDrop ?
                                    <React.StrictMode>
                                        <img className="icon absolute drop-icon" src = "/icon/drop.png" onClick={ innerDropdownTrigger }/>
                                    </React.StrictMode>
                                    :
                                    <React.StrictMode>
                                        <img className="icon absolute drop-icon" src = "/icon/undrop.png" onClick={ innerDropdownTrigger }/>
                                    </React.StrictMode>
                                 }
                                 <div className="absolute r-0 t-100 no-over-flow" style={{ height: `${innerHeight}px` }}>
                                    <div className="drop-container h-200 w-fit" >
                                    { dataTypes.map( type =>
                                        <div className="pg-t-0-5 pg-l-1 pg-b-0-5 drop-item hover border-bottom-pale flex flex-no-wrap bg-white">
                                            <span className="block w-50">{type.label}</span>
                                            <span className="block text-right w-50 italic text-pale pg-r-0-5">{type.exp}</span>
                                        </div>
                                    )}
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-no-wrap mg-t-2">
                        <div className="w-50">
                            <div className="w-fit flex flex-no-wrap">
                                <div className="flex flex-middle">
                                    <input type="checkbox" value={ field.is_primary }/>
                                </div>
                                <div className="flex flex-middle">
                                    <span>Primary key</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="w-fit flex flex-no-wrap">
                                <div className="flex flex-middle">
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex flex-middle">
                                    <span>Visible</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-no-wrap mg-t-2">
                        <div className="w-50">
                            <div className="w-fit flex flex-no-wrap">
                                <div className="flex flex-middle">
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex flex-middle">
                                    <span>Sort index</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="w-fit flex flex-no-wrap">
                                <div className="flex flex-middle">
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex flex-middle">
                                    <span>Search index</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mg-t-2">
                        <span>Foreign keys</span>
                        <div className="table-list">
                            <table className="w-fit no-border">
                                <thead>
                                    <tr>
                                        <th className="text-theme text-left pg-t-0-5 pg-l-0-5 pg-b-0-5" style={ {display: "table-cell"} }>Relation</th>
                                        <th className="text-theme text-left pg-t-0-5 pg-l-0-5 pg-b-0-5" style={ {display: "table-cell"} }>References on</th>

                                    </tr>
                                </thead>
                                <tbody id="relations">
                                    { field.foreign_keys && field.foreign_keys.map( key =>
                                        <tr className="hover">
                                            <td className="pg-t-0-5 pg-l-0-5 pg-b-0-5 border-bottom-pale">{ key.relation_name }</td>
                                            <td className="pg-t-0-5 pg-l-0-5 pg-b-0-5 border-bottom-pale">{ key.referenced_field }</td>
                                        </tr>
                                    ) }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
