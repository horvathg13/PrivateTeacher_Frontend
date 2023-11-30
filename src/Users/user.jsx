import './user.css';
import EventHandler from '../EventHandler/eventhandler';
import Table from '../CommonComponents/Table/table';
import SideMenu from '../CommonComponents/Table/SideMenu/sidemenu';
import ComponentTitle from '../CommonComponents/ComponentTitle/componentTitle';
        
const User = () => {
    return (
        <>
        <ComponentTitle />
        <Table /> 
        <SideMenu />
        </>
            
        
    );
};
export default User;