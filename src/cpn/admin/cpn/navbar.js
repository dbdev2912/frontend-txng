import Relations from '../pages/relations';
import Search from '../pages/search';
import Sort from '../pages/sort';

export default (props) => {

    const utils = [
        { id: 0, href: "/relations", label: "Relations", page: 0 },
        { id: 1, href: "/forms", label: "Forms", page: 1 },
        { id: 2, href: "/tables", label: "Tables", page: 2 },
        { id: 3, href: "/signout", label: "Sign out", page: 3 },
    ]

    return (
        <div className="navbar ">
            <div className="logo" style={{ height: "200px" }}>
                <img className="block w-67 mg-t-1 pg-l-0-5" src="/mylan_logo.png"/>
            </div>
            <div className="mg-t-5">
            { utils.map( util =>
                <div className="block w-fit" key={ util.id } onClick = { ()=> { window.location = util.href } }>
                    <span className="block w-fit pg-t-0-5 pg-r-0-5  pg-b-0-5  pg-l-0-5 hover">{ util.label }</span>
                </div>
            ) }
            </div>
        </div>
    )
}
