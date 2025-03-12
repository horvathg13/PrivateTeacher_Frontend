
class menuButtonPermission{
static hasAccess=(menuItems, userRole, hasAccessMessages, hasAccessRequests)=>{

    if(userRole.some(r=>r === "Parent") || userRole.some(r=>r === "Teacher")){
            let filterMenuItemsByRole=menuItems.filter(menuItem=>menuItem.role.some(r=>userRole.includes(r)));
            let accessToMessages=!hasAccessMessages ? filterMenuItemsByRole.filter(m=>m.name !== "messages") : filterMenuItemsByRole;
            let accessToRequests=!hasAccessRequests ? filterMenuItemsByRole.filter(r=>r.name !== "requests") : filterMenuItemsByRole;

            let final = [...accessToMessages, ...accessToRequests];
            return final.map(item => item).filter((value, index, self) => self.indexOf(value) !== index)

    }
    return menuItems.filter(menuItem=>menuItem.role.some(r=>userRole.includes(r)));

    }
}

export default menuButtonPermission