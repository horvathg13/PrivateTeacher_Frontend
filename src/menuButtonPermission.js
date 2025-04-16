
class menuButtonPermission{
    static hasAccess=(menuItems, userRole, hasAccessMessages, hasAccessRequests, hasChild)=>{

        if(userRole.some(r=>r === "Parent") || userRole.some(r=>r === "Teacher")){
                let filterMenuItemsByRole=menuItems.filter(menuItem=>menuItem.role.some(r=>userRole.includes(r)));
                let accessToMessages=!hasAccessMessages ? filterMenuItemsByRole.filter(m=>m.name !== "messages") : filterMenuItemsByRole;
                let accessToRequests=!hasAccessRequests ? filterMenuItemsByRole.filter(r=>r.name !== "requests") : filterMenuItemsByRole;
                let final = [...accessToMessages, ...accessToRequests];
                let uniqueFinal = final.map(item => item).filter((value, index, self) => self.indexOf(value) !== index)
                let redirectURL = !hasChild ? "/child/create" : "/home";

                if(!userRole.some(r=>r === "Parent") && userRole.some(r=>r === "Teacher")){
                    redirectURL = "/home";
                }
                return {menu:uniqueFinal, url:redirectURL}

        }
        let menu = menuItems.filter(menuItem=>menuItem.role.some(r=>userRole.includes(r)));
        let redirectURL='';
        if(menu.length === 1){
            redirectURL = "/users/list";
        }
        return {menu: menu, url: redirectURL || "/home"}

    }
}

export default menuButtonPermission