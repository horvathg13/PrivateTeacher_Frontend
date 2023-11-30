import "./componentTitle.css";
        
const ComponentTitle = () => {
    return (
        <div className="component-title-container flex">
            <div className="title">
                <h1>Users</h1>
            </div>
            <div className="breadcumbs"><h4>Home {'>'} Hello {'>'} Hello</h4></div>
            <div className="nofitications"><h4>New Message Arrived</h4></div>
        </div>
    );
};
export default ComponentTitle;