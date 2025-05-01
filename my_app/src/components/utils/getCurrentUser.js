export const getCurrentuser = ()=>{
  const currentUserInfo = localStorage?.getItem("userInfo");
   if(currentUserInfo){
    const {user} = JSON.parse(currentUserInfo);
    return user.id;
   }
}